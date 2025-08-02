import { NextResponse } from 'next/server';
import { readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

// Helper function to get data directory path
const getDataDirectory = (): string => {
  try {
    const cwd = process.cwd();
    console.log('Current working directory:', cwd);
    
    // Check if we're in a serverless environment
    if (cwd.includes('/var/task') || cwd.includes('/tmp')) {
      console.log('Detected serverless environment, using /tmp');
      return '/tmp/data';
    }
    
    // Use the standard public/data directory
    const dataDir = join(cwd, 'public', 'data');
    console.log('Using standard data directory:', dataDir);
    return dataDir;
  } catch (error) {
    console.error('Error determining data directory:', error);
    return '/tmp/data';
  }
};

export async function GET() {
  try {
    const dataDir = getDataDirectory();
    const dirExists = existsSync(dataDir);
    
    console.log('=== EXCEL DEBUG INFO ===');
    console.log('Data directory:', dataDir);
    console.log('Directory exists:', dirExists);
    
    let files = [];
    let dirStats = null;
    
    if (dirExists) {
      try {
        files = readdirSync(dataDir);
        const dirStat = statSync(dataDir);
        dirStats = {
          isDirectory: dirStat.isDirectory(),
          size: dirStat.size,
          permissions: dirStat.mode.toString(8),
          created: dirStat.birthtime,
          modified: dirStat.mtime
        };
        
        console.log('Directory stats:', dirStats);
        console.log('Files in directory:', files);
        
        // Get details for each file
        const fileDetails = files.map(filename => {
          const filePath = join(dataDir, filename);
          const fileStat = statSync(filePath);
          return {
            name: filename,
            size: fileStat.size,
            created: fileStat.birthtime,
            modified: fileStat.mtime,
            isFile: fileStat.isFile(),
            isDirectory: fileStat.isDirectory()
          };
        });
        
        console.log('File details:', fileDetails);
        
        return NextResponse.json({
          success: true,
          dataDirectory: dataDir,
          directoryExists: dirExists,
          directoryStats: dirStats,
          files: files,
          fileDetails: fileDetails,
          environment: process.env.NODE_ENV,
          cwd: process.cwd(),
          timestamp: new Date().toISOString()
        });
        
      } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({
          success: false,
          error: 'Failed to read directory',
          details: error instanceof Error ? error.message : 'Unknown error',
          dataDirectory: dataDir,
          directoryExists: dirExists,
          environment: process.env.NODE_ENV,
          cwd: process.cwd(),
          timestamp: new Date().toISOString()
        }, { status: 500 });
      }
    } else {
      console.log('Directory does not exist');
      return NextResponse.json({
        success: false,
        error: 'Data directory does not exist',
        dataDirectory: dataDir,
        directoryExists: dirExists,
        environment: process.env.NODE_ENV,
        cwd: process.cwd(),
        timestamp: new Date().toISOString()
      }, { status: 404 });
    }
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Debug API failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      cwd: process.cwd(),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 