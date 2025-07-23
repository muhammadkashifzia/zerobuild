'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useState, useRef, useEffect } from 'react';

type DataPoint = {
  name: string;
  Fabric: string;
  Orientation: string;
  UserBehaviour: string;
  Compliance: string;
  Comfort: string;
  Cost: string;
  CostNum: number;
  Carbon: string;
  CarbonNum: number;
  Circularity: number;
  index?: number;
};

const rawData: DataPoint[] = [
   {
    name: '1',
    Fabric: 'Standard timber frame with rigid PIR insulation and brick cladding',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£392,261',
    CostNum: 392261,
    Carbon: '67,425',
    CarbonNum: 67425,
    Circularity: 63,
  },
  {
    name: '2',
    Fabric: 'Timber frame with mineral wool insulation and render',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Overheating',
    Cost: '£373,385',
    CostNum: 373385,
    Carbon: '58,578',
    CarbonNum: 58578,
    Circularity: 76,
  },
  {
    name: '3',
    Fabric: 'Natural build-up with Hemplime and timber cladding',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£384,151',
    CostNum: 384151,
    Carbon: '53,339',
    CarbonNum: 53339,
    Circularity: 66,
  },
  {
    name: '4',
    Fabric: 'Lime-rendered hemplime timber frame',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£367,437',
    CostNum: 367437,
    Carbon: '54,250',
    CarbonNum: 54250,
    Circularity: 67,
  },
  {
    name: '5',
    Fabric: 'Brick and block cavity wall with mineral wool',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Average',
    Cost: '£351,900',
    CostNum: 351900,
    Carbon: '59,850',
    CarbonNum: 59850,
    Circularity: 60,
  },
  {
    name: '6',
    Fabric: 'Dense concrete block cavity wall with partial fill',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Cool',
    Cost: '£360,000',
    CostNum: 360000,
    Carbon: '61,000',
    CarbonNum: 61000,
    Circularity: 55,
  },
  {
    name: '7',
    Fabric: 'Clay block with PIR and brick slip finish',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Warm',
    Cost: '£370,000',
    CostNum: 370000,
    Carbon: '57,500',
    CarbonNum: 57500,
    Circularity: 65,
  },
  {
    name: '8',
    Fabric: 'Clay block and PIR with timber exterior',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Neutral',
    Cost: '£365,000',
    CostNum: 365000,
    Carbon: '56,200',
    CarbonNum: 56200,
    Circularity: 62,
  },
  {
    name: '9',
    Fabric: 'Clay block with mineral wool and render',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Moderate',
    Cost: '£355,000',
    CostNum: 355000,
    Carbon: '58,000',
    CarbonNum: 58000,
    Circularity: 64,
  },
  {
    name: '10',
    Fabric: 'Claylay block with woodfibre and cork',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£345,000',
    CostNum: 345000,
    Carbon: '52,000',
    CarbonNum: 52000,
    Circularity: 68,
  },
    {
    name: "11",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "",
    Comfort: "Feels nice",
    Cost: "£386,613",
    CostNum: 386613,
    Carbon: "51,931",
    CarbonNum: 51931,
    Circularity: 63,
    index: 10
  },
  {
    name: "12",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£372,900",
    CostNum: 372900,
    Carbon: "41,821",
    CarbonNum: 41821,
    Circularity: 76,
    index: 11
  },
  {
    name: "13",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£383,662",
    CostNum: 383662,
    Carbon: "38,240",
    CarbonNum: 38240,
    Circularity: 67,
    index: 12
  },
  {
    name: "14",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£366,952",
    CostNum: 366952,
    Carbon: "37,608",
    CarbonNum: 37608,
    Circularity: 66,
    index: 13
  },
  // Entry 15
  {
    name: "15",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£368,481",
    CostNum: 368481,
    Carbon: "49,606",
    CarbonNum: 49606,
    Circularity: 66,
    index: 14
  },
  {
    name: "16",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£369,584",
    CostNum: 369584,
    Carbon: "49,602",
    CarbonNum: 49602,
    Circularity: 66,
    index: 15
  },
  {
    name: "17",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£370,458",
    CostNum: 370458,
    Carbon: "45,427",
    CarbonNum: 45427,
    Circularity: 70,
    index: 16
  },
  {
    name: "18",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£377,314",
    CostNum: 377314,
    Carbon: "43,739",
    CarbonNum: 43739,
    Circularity: 79,
    index: 17
  },
  {
    name: "19",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£362,586",
    CostNum: 362586,
    Carbon: "46,212",
    CarbonNum: 46212,
    Circularity: 82,
    index: 18
  },
  {
    name: "20",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£379,204",
    CostNum: 379204,
    Carbon: "39,202",
    CarbonNum: 39202,
    Circularity: 80,
    index: 19
  },
  // Entry 21
  {
    name: "21",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£322,864",
    CostNum: 322864,
    Carbon: "47,462",
    CarbonNum: 47462,
    Circularity: 63,
    index: 20
  },
  {
    name: "22",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Overheating",
    Cost: "£309,227",
    CostNum: 309227,
    Carbon: "36,245",
    CarbonNum: 36245,
    Circularity: 76,
    index: 21
  },
  {
    name: "23",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£315,970",
    CostNum: 315970,
    Carbon: "30,784",
    CarbonNum: 30784,
    Circularity: 66,
    index: 22
  },
  {
    name: "24",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£303,231",
    CostNum: 303231,
    Carbon: "32,158",
    CarbonNum: 32158,
    Circularity: 66,
    index: 23
  },
  {
    name: "25",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£304,771",
    CostNum: 304771,
    Carbon: "42,360",
    CarbonNum: 42360,
    Circularity: 72,
    index: 24
  },
  // Entry 26
  {
    name: "26",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Cool",
    Cost: "£312,209",
    CostNum: 312209,
    Carbon: "43,652",
    CarbonNum: 43652,
    Circularity: 55,
    index: 25
  },
  {
    name: "27",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Warm",
    Cost: "£323,550",
    CostNum: 323550,
    Carbon: "39,721",
    CarbonNum: 39721,
    Circularity: 65,
    index: 26
  },
  {
    name: "28",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Neutral",
    Cost: "£318,550",
    CostNum: 318550,
    Carbon: "38,421",
    CarbonNum: 38421,
    Circularity: 62,
    index: 27
  },
  {
    name: "29",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Moderate",
    Cost: "£308,550",
    CostNum: 308550,
    Carbon: "40,240",
    CarbonNum: 40240,
    Circularity: 64,
    index: 28
  },
  {
    name: "30",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "North-South",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£298,900",
    CostNum: 298900,
    Carbon: "33,221",
    CarbonNum: 33221,
    Circularity: 68,
    index: 29
  },
  // Entry 31
  {
    name: "31",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£307,100",
    CostNum: 307100,
    Carbon: "43,312",
    CarbonNum: 43312,
    Circularity: 60,
    index: 30
  },
  {
    name: "32",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Cool",
    Cost: "£315,290",
    CostNum: 315290,
    Carbon: "44,483",
    CarbonNum: 44483,
    Circularity: 55,
    index: 31
  },
  {
    name: "33",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Warm",
    Cost: "£326,547",
    CostNum: 326547,
    Carbon: "40,552",
    CarbonNum: 40552,
    Circularity: 65,
    index: 32
  },
  {
    name: "34",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Neutral",
    Cost: "£321,555",
    CostNum: 321555,
    Carbon: "39,253",
    CarbonNum: 39253,
    Circularity: 62,
    index: 33
  },
  {
    name: "35",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Moderate",
    Cost: "£311,050",
    CostNum: 311050,
    Carbon: "40,962",
    CarbonNum: 40962,
    Circularity: 64,
    index: 34
  },
  {
    name: "36",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£301,400",
    CostNum: 301400,
    Carbon: "33,944",
    CarbonNum: 33944,
    Circularity: 68,
    index: 35
  },
  // Entry 37
  {
    name: "37",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£386,113",
    CostNum: 386113,
    Carbon: "63,891",
    CarbonNum: 63891,
    Circularity: 63,
    index: 36
  },
  {
    name: "38",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£364,317",
    CostNum: 364317,
    Carbon: "55,044",
    CarbonNum: 55044,
    Circularity: 76,
    index: 37
  },
  {
    name: "39",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£375,083",
    CostNum: 375083,
    Carbon: "49,805",
    CarbonNum: 49805,
    Circularity: 66,
    index: 38
  },
  {
    name: "40",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£358,414",
    CostNum: 358414,
    Carbon: "50,671",
    CarbonNum: 50671,
    Circularity: 67,
    index: 39
  },
  {
    name: "41",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Average",
    Cost: "£343,362",
    CostNum: 343362,
    Carbon: "56,230",
    CarbonNum: 56230,
    Circularity: 60,
    index: 40
  },
  {
    name: "42",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Cool",
    Cost: "£352,368",
    CostNum: 352368,
    Carbon: "57,401",
    CarbonNum: 57401,
    Circularity: 55,
    index: 41
  },
  {
    name: "43",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Warm",
    Cost: "£362,505",
    CostNum: 362505,
    Carbon: "53,694",
    CarbonNum: 53694,
    Circularity: 65,
    index: 42
  },
  {
    name: "44",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Neutral",
    Cost: "£357,439",
    CostNum: 357439,
    Carbon: "52,559",
    CarbonNum: 52559,
    Circularity: 62,
    index: 43
  },
  {
    name: "45",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£347,263",
    CostNum: 347263,
    Carbon: "54,237",
    CarbonNum: 54237,
    Circularity: 64,
    index: 44
  },
  {
    name: "46",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "North-South",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£337,680",
    CostNum: 337680,
    Carbon: "48,471",
    CarbonNum: 48471,
    Circularity: 68,
    index: 45
  },
  // Entry 47
  {
    name: "47",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£378,738",
    CostNum: 378738,
    Carbon: "48,133",
    CarbonNum: 48133,
    Circularity: 63,
    index: 46
  },
  {
    name: "48",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£360,505",
    CostNum: 360505,
    Carbon: "39,463",
    CarbonNum: 39463,
    Circularity: 76,
    index: 47
  },
  {
    name: "49",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£371,016",
    CostNum: 371016,
    Carbon: "35,192",
    CarbonNum: 35192,
    Circularity: 67,
    index: 48
  },
  {
    name: "50",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£353,694",
    CostNum: 353694,
    Carbon: "34,560",
    CarbonNum: 34560,
    Circularity: 66,
    index: 49
  },
  // Entry 51
  {
    name: "51",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£355,234",
    CostNum: 355234,
    Carbon: "44,762",
    CarbonNum: 44762,
    Circularity: 66,
    index: 50
  },
  {
    name: "52",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£356,337",
    CostNum: 356337,
    Carbon: "44,759",
    CarbonNum: 44759,
    Circularity: 66,
    index: 51
  },
  {
    name: "53",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£357,211",
    CostNum: 357211,
    Carbon: "40,583",
    CarbonNum: 40583,
    Circularity: 70,
    index: 52
  },
  {
    name: "54",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£364,067",
    CostNum: 364067,
    Carbon: "38,896",
    CarbonNum: 38896,
    Circularity: 79,
    index: 53
  },
  {
    name: "55",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£349,339",
    CostNum: 349339,
    Carbon: "41,368",
    CarbonNum: 41368,
    Circularity: 82,
    index: 54
  },
  {
    name: "56",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Passive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£366,170",
    CostNum: 366170,
    Carbon: "34,358",
    CarbonNum: 34358,
    Circularity: 80,
    index: 55
  },
  // Entry 57
  {
    name: "57",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£385,969",
    CostNum: 385969,
    Carbon: "62,212",
    CarbonNum: 62212,
    Circularity: 63,
    index: 56
  },
  {
    name: "58",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£364,173",
    CostNum: 364173,
    Carbon: "53,365",
    CarbonNum: 53365,
    Circularity: 76,
    index: 57
  },
  {
    name: "59",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£374,949",
    CostNum: 374949,
    Carbon: "47,905",
    CarbonNum: 47905,
    Circularity: 66,
    index: 58
  },
  {
    name: "60",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£358,280",
    CostNum: 358280,
    Carbon: "48,771",
    CarbonNum: 48771,
    Circularity: 67,
    index: 59
  },
  // Entry 61
  {
    name: "61",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£343,210",
    CostNum: 343210,
    Carbon: "52,423",
    CarbonNum: 52423,
    Circularity: 60,
    index: 60
  },
  {
    name: "62",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Cool",
    Cost: "£352,230",
    CostNum: 352230,
    Carbon: "53,584",
    CarbonNum: 53584,
    Circularity: 55,
    index: 61
  },
  {
    name: "63",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Warm",
    Cost: "£362,211",
    CostNum: 362211,
    Carbon: "49,877",
    CarbonNum: 49877,
    Circularity: 65,
    index: 62
  },
  {
    name: "64",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Neutral",
    Cost: "£357,230",
    CostNum: 357230,
    Carbon: "48,679",
    CarbonNum: 48679,
    Circularity: 62,
    index: 63
  },
  {
    name: "65",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£347,105",
    CostNum: 347105,
    Carbon: "50,347",
    CarbonNum: 50347,
    Circularity: 64,
    index: 64
  },
  {
    name: "66",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "North-South",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£337,440",
    CostNum: 337440,
    Carbon: "44,416",
    CarbonNum: 44416,
    Circularity: 68,
    index: 65
  },
  // Entry 67
  {
    name: "67",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£355,105",
    CostNum: 355105,
    Carbon: "47,110",
    CarbonNum: 47110,
    Circularity: 60,
    index: 66
  },
  {
    name: "68",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Cool",
    Cost: "£363,205",
    CostNum: 363205,
    Carbon: "48,215",
    CarbonNum: 48215,
    Circularity: 55,
    index: 67
  },
  {
    name: "69",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Warm",
    Cost: "£373,550",
    CostNum: 373550,
    Carbon: "44,701",
    CarbonNum: 44701,
    Circularity: 65,
    index: 68
  },
  {
    name: "70",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Neutral",
    Cost: "£368,590",
    CostNum: 368590,
    Carbon: "43,299",
    CarbonNum: 43299,
    Circularity: 62,
    index: 69
  },
  // Entry 71
  {
    name: "71",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£358,190",
    CostNum: 358190,
    Carbon: "45,503",
    CarbonNum: 45503,
    Circularity: 64,
    index: 70
  },
  {
    name: "72",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Proactive",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£348,760",
    CostNum: 348760,
    Carbon: "39,050",
    CarbonNum: 39050,
    Circularity: 68,
    index: 71
  },
  // Entry 73
  {
    name: "73",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£379,518",
    CostNum: 379518,
    Carbon: "60,831",
    CarbonNum: 60831,
    Circularity: 63,
    index: 72
  },
  {
    name: "74",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£357,707",
    CostNum: 357707,
    Carbon: "52,134",
    CarbonNum: 52134,
    Circularity: 76,
    index: 73
  },
  {
    name: "75",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£368,483",
    CostNum: 368483,
    Carbon: "46,939",
    CarbonNum: 46939,
    Circularity: 66,
    index: 74
  },
  {
    name: "76",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£351,899",
    CostNum: 351899,
    Carbon: "47,805",
    CarbonNum: 47805,
    Circularity: 67,
    index: 75
  },
  {
    name: "77",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Average",
    Cost: "£336,280",
    CostNum: 336280,
    Carbon: "52,956",
    CarbonNum: 52956,
    Circularity: 60,
    index: 76
  },
  {
    name: "78",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Cool",
    Cost: "£344,911",
    CostNum: 344911,
    Carbon: "54,127",
    CarbonNum: 54127,
    Circularity: 55,
    index: 77
  },
  {
    name: "79",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Warm",
    Cost: "£354,291",
    CostNum: 354291,
    Carbon: "50,410",
    CarbonNum: 50410,
    Circularity: 65,
    index: 78
  },
  {
    name: "80",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Neutral",
    Cost: "£349,225",
    CostNum: 349225,
    Carbon: "49,512",
    CarbonNum: 49512,
    Circularity: 62,
    index: 79
  },
  // Entry 81
  {
    name: "81",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£339,392",
    CostNum: 339392,
    Carbon: "51,265",
    CarbonNum: 51265,
    Circularity: 64,
    index: 80
  },
  {
    name: "82",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£329,920",
    CostNum: 329920,
    Carbon: "45,676",
    CarbonNum: 45676,
    Circularity: 68,
    index: 81
  },
  {
    name: "83",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£372,287",
    CostNum: 372287,
    Carbon: "46,450",
    CarbonNum: 46450,
    Circularity: 63,
    index: 82
  },
  {
    name: "84",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£353,574",
    CostNum: 353574,
    Carbon: "37,111",
    CarbonNum: 37111,
    Circularity: 76,
    index: 83
  },
  {
    name: "85",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£364,350",
    CostNum: 364350,
    Carbon: "32,889",
    CarbonNum: 32889,
    Circularity: 67,
    index: 84
  },
  {
    name: "86",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£347,737",
    CostNum: 347737,
    Carbon: "32,257",
    CarbonNum: 32257,
    Circularity: 66,
    index: 85
  },
  {
    name: "87",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£349,277",
    CostNum: 349277,
    Carbon: "42,459",
    CarbonNum: 42459,
    Circularity: 66,
    index: 86
  },
  {
    name: "88",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£350,380",
    CostNum: 350380,
    Carbon: "42,456",
    CarbonNum: 42456,
    Circularity: 66,
    index: 87
  },
  {
    name: "89",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£351,254",
    CostNum: 351254,
    Carbon: "38,280",
    CarbonNum: 38280,
    Circularity: 70,
    index: 88
  },
  {
    name: "90",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£358,110",
    CostNum: 358110,
    Carbon: "36,693",
    CarbonNum: 36693,
    Circularity: 79,
    index: 89
  },
  // Entry 91
  {
    name: "91",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£340,492",
    CostNum: 340492,
    Carbon: "39,978",
    CarbonNum: 39978,
    Circularity: 64,
    index: 90
  },
  {
    name: "92",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£329,750",
    CostNum: 329750,
    Carbon: "34,768",
    CarbonNum: 34768,
    Circularity: 68,
    index: 91
  },
  // Entry 93
  {
    name: "93",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£371,740",
    CostNum: 371740,
    Carbon: "58,768",
    CarbonNum: 58768,
    Circularity: 63,
    index: 92
  },
  {
    name: "94",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£351,711",
    CostNum: 351711,
    Carbon: "50,435",
    CarbonNum: 50435,
    Circularity: 76,
    index: 93
  },
  {
    name: "95",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£362,486",
    CostNum: 362486,
    Carbon: "45,160",
    CarbonNum: 45160,
    Circularity: 66,
    index: 94
  },
  {
    name: "96",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£346,270",
    CostNum: 346270,
    Carbon: "45,992",
    CarbonNum: 45992,
    Circularity: 67,
    index: 95
  },
  {
    name: "97",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Average",
    Cost: "£330,285",
    CostNum: 330285,
    Carbon: "51,129",
    CarbonNum: 51129,
    Circularity: 60,
    index: 96
  },
  {
    name: "98",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Cool",
    Cost: "£338,532",
    CostNum: 338532,
    Carbon: "52,234",
    CarbonNum: 52234,
    Circularity: 55,
    index: 97
  },
  {
    name: "99",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Warm",
    Cost: "£348,078",
    CostNum: 348078,
    Carbon: "48,120",
    CarbonNum: 48120,
    Circularity: 65,
    index: 98
  },
  {
    name: "100",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Neutral",
    Cost: "£343,089",
    CostNum: 343089,
    Carbon: "47,303",
    CarbonNum: 47303,
    Circularity: 62,
    index: 99
  },
  // Entry 101
  {
    name: "101",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£335,500",
    CostNum: 335500,
    Carbon: "49,100",
    CarbonNum: 49100,
    Circularity: 64,
    index: 100
  },
  {
    name: "102",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£325,800",
    CostNum: 325800,
    Carbon: "43,800",
    CarbonNum: 43800,
    Circularity: 68,
    index: 101
  },
  // Entry 103
  {
    name: "103",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£367,220",
    CostNum: 367220,
    Carbon: "43,480",
    CarbonNum: 43480,
    Circularity: 63,
    index: 102
  },
  {
    name: "104",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£348,507",
    CostNum: 348507,
    Carbon: "34,141",
    CarbonNum: 34141,
    Circularity: 76,
    index: 103
  },
  {
    name: "105",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£359,283",
    CostNum: 359283,
    Carbon: "29,919",
    CarbonNum: 29919,
    Circularity: 67,
    index: 104
  },
  {
    name: "106",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£342,670",
    CostNum: 342670,
    Carbon: "29,287",
    CarbonNum: 29287,
    Circularity: 66,
    index: 105
  },
  {
    name: "107",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£344,210",
    CostNum: 344210,
    Carbon: "39,489",
    CarbonNum: 39489,
    Circularity: 66,
    index: 106
  },
  {
    name: "108",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£345,313",
    CostNum: 345313,
    Carbon: "39,485",
    CarbonNum: 39485,
    Circularity: 66,
    index: 107
  },
  {
    name: "109",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£346,187",
    CostNum: 346187,
    Carbon: "35,309",
    CarbonNum: 35309,
    Circularity: 70,
    index: 108
  },
  {
    name: "110",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£352,999",
    CostNum: 352999,
    Carbon: "33,721",
    CarbonNum: 33721,
    Circularity: 79,
    index: 109
  },
  // Entry 111
  {
    name: "111",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Moderate",
    Cost: "£337,000",
    CostNum: 337000,
    Carbon: "37,340",
    CarbonNum: 37340,
    Circularity: 64,
    index: 110
  },
  {
    name: "112",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£326,510",
    CostNum: 326510,
    Carbon: "32,240",
    CarbonNum: 32240,
    Circularity: 68,
    index: 111
  },
  // Entry 113
  {
    name: "113",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£357,999",
    CostNum: 357999,
    Carbon: "41,122",
    CarbonNum: 41122,
    Circularity: 63,
    index: 112
  },
  {
    name: "114",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Overheating",
    Cost: "£337,100",
    CostNum: 337100,
    Carbon: "32,970",
    CarbonNum: 32970,
    Circularity: 76,
    index: 113
  },
  {
    name: "115",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£344,259",
    CostNum: 344259,
    Carbon: "28,523",
    CarbonNum: 28523,
    Circularity: 66,
    index: 114
  },
  {
    name: "116",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£331,984",
    CostNum: 331984,
    Carbon: "30,171",
    CarbonNum: 30171,
    Circularity: 66,
    index: 115
  },
  {
    name: "117",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Average",
    Cost: "£334,001",
    CostNum: 334001,
    Carbon: "39,732",
    CarbonNum: 39732,
    Circularity: 60,
    index: 116
  },
  {
    name: "118",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Cool",
    Cost: "£341,828",
    CostNum: 341828,
    Carbon: "40,950",
    CarbonNum: 40950,
    Circularity: 55,
    index: 117
  },
  {
    name: "119",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Warm",
    Cost: "£351,450",
    CostNum: 351450,
    Carbon: "36,838",
    CarbonNum: 36838,
    Circularity: 65,
    index: 118
  },
  {
    name: "120",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Neutral",
    Cost: "£346,412",
    CostNum: 346412,
    Carbon: "35,905",
    CarbonNum: 35905,
    Circularity: 62,
    index: 119
  },
  // Entry 121
  {
    name: "121",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£348,410",
    CostNum: 348410,
    Carbon: "39,170",
    CarbonNum: 39170,
    Circularity: 66,
    index: 120
  },
  {
    name: "122",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£349,513",
    CostNum: 349513,
    Carbon: "39,167",
    CarbonNum: 39167,
    Circularity: 66,
    index: 121
  },
  {
    name: "123",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Overheating",
    Cost: "£350,387",
    CostNum: 350387,
    Carbon: "34,991",
    CarbonNum: 34991,
    Circularity: 70,
    index: 122
  },
  {
    name: "124",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£357,199",
    CostNum: 357199,
    Carbon: "33,403",
    CarbonNum: 33403,
    Circularity: 79,
    index: 123
  },
  {
    name: "125",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Moderate",
    Cost: "£338,692",
    CostNum: 338692,
    Carbon: "36,255",
    CarbonNum: 36255,
    Circularity: 64,
    index: 124
  },
  {
    name: "126",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Perfect!",
    Cost: "£327,202",
    CostNum: 327202,
    Carbon: "30,955",
    CarbonNum: 30955,
    Circularity: 68,
    index: 125
  },
  // Entry 127
  {
    name: "127",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Feels nice",
    Cost: "£361,499",
    CostNum: 361499,
    Carbon: "39,242",
    CarbonNum: 39242,
    Circularity: 63,
    index: 126
  },
  {
    name: "128",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "North-South",
    UserBehaviour: "Informed",
    Compliance: "Net Zero ready",
    Comfort: "Overheating",
    Cost: "£340,822",
    CostNum: 340822,
    Carbon: "30,960",
    CarbonNum: 30960,
    Circularity: 76,
    index: 127
  },
];

// Add index to each data point
const data: DataPoint[] = rawData.map((item, index) => ({ ...item, index }));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 p-4 rounded shadow text-sm text-gray-800">
        <p><strong>Fabric:</strong> {d.Fabric}</p>
        <p><strong>Orientation:</strong> {d.Orientation}</p>
        <p><strong>Compliance:</strong> {d.Compliance}</p>
        <p><strong>Comfort:</strong> {d.Comfort}</p>
        <p><strong>Circularity:</strong> {d.Circularity}</p>
      </div>
    );
  }
  return null;
};

// Custom dot shape for highlighting on hover and priority
type CustomDotProps = {
  cx?: number;
  cy?: number;
  payload: any;
  priority: 'Comfort' | 'Compliance' | 'Circularity';
};

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload, priority } = props;

  // Helper to interpolate between two hex colors
  function lerpColor(a: string, b: string, t: number) {
    const ah = a.replace('#', '');
    const bh = b.replace('#', '');
    const ar = parseInt(ah.substring(0, 2), 16);
    const ag = parseInt(ah.substring(2, 4), 16);
    const ab = parseInt(ah.substring(4, 6), 16);
    const br = parseInt(bh.substring(0, 2), 16);
    const bg = parseInt(bh.substring(2, 4), 16);
    const bb = parseInt(bh.substring(4, 6), 16);
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `#${rr.toString(16).padStart(2, '0')}${rg.toString(16).padStart(2, '0')}${rb.toString(16).padStart(2, '0')}`;
  }

  let fill = '#8884d8';

  if (priority === 'Circularity' && payload && typeof payload.Circularity === 'number') {
    // Circularity gradient: light green (#bbf7d0) to dark green (#166534)
    const minCirc = 55; // lowest in your data
    const maxCirc = 82; // highest in your data
    const t = Math.max(0, Math.min(1, (payload.Circularity - minCirc) / (maxCirc - minCirc)));
    fill = lerpColor('#bbf7d0', '#166534', t);
  } else if (payload && payload.Comfort) {
    const comfort = payload.Comfort.toLowerCase();
    if (comfort === 'underheating') fill = '#2563eb'; // blue
    else if (comfort === 'overheating') fill = '#ef4444'; // red
    else if (comfort === 'feels nice' || comfort === 'perfect!') fill = '#22c55e'; // green
    else fill = '#8884d8'; // fallback
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={payload && payload.index !== undefined ? 8 : 5}
      fill={fill}
      stroke="#156082"
      strokeWidth={payload && payload.index !== undefined ? 2 : 1}
      opacity={1}
    />
  );
};

export default function ObservabilityChart() {
  const [xAxisType, setXAxisType] = useState<'CostNum' | 'CarbonNum'>('CarbonNum');
  const [priority, setPriority] = useState<'Comfort' | 'Compliance' | 'Circularity'>('Comfort');
  const [box, setBox] = useState({
    x: 0.2, // percent (0-1)
    y: 0.2,
    width: 0.3,
    height: 0.3,
    dragging: false,
    resizing: false,
    dragStart: { x: 0, y: 0 },
    boxStart: { x: 0, y: 0, width: 0, height: 0 },
    resizeDir: '',
  });
  const [ctaVisible, setCtaVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDims, setChartDims] = useState({ left: 0, top: 0, width: 1, height: 1 });

  // Get chart dimensions for overlay
  useEffect(() => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setChartDims({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
  }, []);

  // Show CTA after box is moved or resized
  const showCTA = () => {
    if (!ctaVisible) setCtaVisible(true);
  };

  // Mouse/touch handlers for drag/resize
  const onBoxMouseDown = (e: React.MouseEvent | React.TouchEvent, resizeDir = '') => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setBox((prev) => ({
      ...prev,
      dragging: !resizeDir,
      resizing: !!resizeDir,
      dragStart: { x: clientX, y: clientY },
      boxStart: { x: prev.x, y: prev.y, width: prev.width, height: prev.height },
      resizeDir,
    }));
    document.body.style.userSelect = 'none';
  };
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!box.dragging && !box.resizing) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      let dx = (clientX - box.dragStart.x) / chartDims.width;
      let dy = (clientY - box.dragStart.y) / chartDims.height;
      let newBox = { ...box };
      if (box.dragging) {
        newBox.x = Math.max(0, Math.min(1 - box.width, box.boxStart.x + dx));
        newBox.y = Math.max(0, Math.min(1 - box.height, box.boxStart.y + dy));
      } else if (box.resizing) {
        // Only bottom-right resize for simplicity
        if (box.resizeDir === 'br') {
          newBox.width = Math.max(0.05, Math.min(1 - box.x, box.boxStart.width + dx));
          newBox.height = Math.max(0.05, Math.min(1 - box.y, box.boxStart.height + dy));
        }
      }
      setBox({ ...newBox, dragging: box.dragging, resizing: box.resizing, dragStart: box.dragStart, boxStart: box.boxStart, resizeDir: box.resizeDir });
      showCTA();
    };
    const onUp = () => {
      setBox((prev) => ({ ...prev, dragging: false, resizing: false }));
      document.body.style.userSelect = '';
    };
    if (box.dragging || box.resizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [box, chartDims]);

  // Axis labels and formatters
  const xAxisLabel = xAxisType === 'CostNum' ? 'Lifecycle Cost (£/m²)' : 'Whole Life Carbon (kgCO₂e/m²)';
  const yAxisLabel = xAxisType === 'CostNum' ? 'Whole Life Carbon (kgCO₂e/m²)' : 'Lifecycle Cost (£/m²)';
  const xAxisFormatter = (v: number) => xAxisType === 'CostNum' ? `£${(v / 1000).toFixed(0)}k` : `${(v / 1000).toFixed(0)}k`;
  const yAxisFormatter = (v: number) => xAxisType === 'CostNum' ? `${(v / 1000).toFixed(0)}k` : `£${(v / 1000).toFixed(0)}k`;

  // Box pixel position/size
  const boxPx = {
    left: chartDims.width * box.x,
    top: chartDims.height * box.y,
    width: chartDims.width * box.width,
    height: chartDims.height * box.height,
  };

  // Priority toggle button style
  const priorityBtn = (val: typeof priority) =>
    `px-4 py-2 rounded mr-2 ${priority === val ? 'bg-[#484AB7] text-white' : 'bg-gray-200 text-gray-700'}`;

  // Filtered points in box
  const xKey = xAxisType;
  const yKey = xAxisType === 'CostNum' ? 'CarbonNum' : 'CostNum';
  const xMin = Math.min(...data.map((d) => d[xKey]));
  const xMax = Math.max(...data.map((d) => d[xKey]));
  const yMin = Math.min(...data.map((d) => d[yKey]));
  const yMax = Math.max(...data.map((d) => d[yKey]));
  const boxX0 = xMin + box.x * (xMax - xMin);
  const boxX1 = xMin + (box.x + box.width) * (xMax - xMin);
  const boxY0 = yMin + box.y * (yMax - yMin);
  const boxY1 = yMin + (box.y + box.height) * (yMax - yMin);
  const inBox = (d: DataPoint) => {
    const x = d[xKey];
    const y = d[yKey];
    return x >= boxX0 && x <= boxX1 && y >= boxY0 && y <= boxY1;
  };

  return (
    <div className="px-[16px] graph-icon relative">
      <div className='bg-white text-gray-900 px-2 py-4 md:p-6 rounded-lg shadow-md w-full max-w-6xl md:mx-auto border border-gray-200'>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
    Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one.
        </h2>
        <p className="text-gray-600 mb-2">
        Choose what matters most
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="flex items-center justify-center font-semibold text-gray-700">Priority:</span>
          {/* Cost and Carbon always selected, not clickable */}
          <button className="px-4 py-2 rounded mr-2 bg-[#484AB7] text-white cursor-default" disabled>Cost</button>
          <button className="px-4 py-2 rounded mr-2 bg-[#484AB7] text-white cursor-default" disabled>Carbon</button>
          {/* Only one of Comfort, Compliance, Circularity can be selected */}
          <button onClick={() => setPriority('Comfort')} className={priorityBtn('Comfort')}>Comfort</button>
          <button onClick={() => setPriority('Compliance')} className={priorityBtn('Compliance')}>Compliance</button>
          <button onClick={() => setPriority('Circularity')} className={priorityBtn('Circularity')}>Circularity</button>
        </div>

        <div ref={chartRef} className="relative w-full h-[600px]">
          {/* Only render overlays if chartDims are valid */}
          {chartDims.width > 10 && chartDims.height > 10 && (
            <>
              {/* Dimming overlay */}
              <div style={{
                position: 'absolute',
                left: 0, top: 0, width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
              }}>
                {/* Top */}
                <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: boxPx.top, background: 'transparent' }} />
                {/* Bottom */}
                <div style={{ position: 'absolute', left: 0, top: boxPx.top + boxPx.height, width: '100%', height: chartDims.height - (boxPx.top + boxPx.height), background: 'transparent' }} />
                {/* Left */}
                <div style={{ position: 'absolute', left: 0, top: boxPx.top, width: boxPx.left, height: boxPx.height, background: 'transparent' }} />
                {/* Right */}
                <div style={{ position: 'absolute', left: boxPx.left + boxPx.width, top: boxPx.top, width: chartDims.width - (boxPx.left + boxPx.width), height: boxPx.height, background: 'transparent' }} />
              </div>
              {/* Draggable/Resizable Box */}
              <div
                style={{
                  position: 'absolute',
                  left: boxPx.left,
                  top: boxPx.top,
                  width: boxPx.width,
                  height: boxPx.height,
                  background: 'rgba(72,74,183,0.18)',
                  border: '2px solid #484ab7',
                  borderRadius: 8,
                  zIndex: 3,
                  cursor: box.dragging ? 'grabbing' : 'grab',
                  boxShadow: '0 2px 8px rgba(72,74,183,0.12)',
                  transition: 'box-shadow 0.2s',
                  userSelect: 'none',
                }}
                onMouseDown={(e) => onBoxMouseDown(e)}
                onTouchStart={(e) => onBoxMouseDown(e)}
              >
                {/* Resize handle (bottom-right) */}
                <div
                  style={{
                    position: 'absolute',
                    right: 0, bottom: 0, width: 18, height: 18,
                    background: '#484ab7',
                    borderRadius: '0 0 8px 0',
                    cursor: 'nwse-resize',
                    zIndex: 4,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
                  }}
                  onMouseDown={(e) => onBoxMouseDown(e, 'br')}
                  onTouchStart={(e) => onBoxMouseDown(e, 'br')}
                >
                  <svg width="18" height="18"><rect x="6" y="12" width="6" height="2" fill="#fff" /><rect x="12" y="6" width="2" height="6" fill="#fff" /></svg>
                </div>
              </div>
            </>
          )}
          {/* Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey={xKey}
                stroke="#156082"
                tickFormatter={xAxisFormatter}
                label={{
                  value: xAxisLabel,
                  position: 'insideBottom',
                  offset: -6,
                  fill: '#156082',
                }}
                domain={[xMin, xMax]}
              />
              <YAxis
                type="number"
                dataKey={yKey}
                domain={[yMin, yMax]}
                stroke="#156082"
                tickFormatter={yAxisFormatter}
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#555',
                }}
              />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-gray-200 p-4 rounded shadow text-sm text-gray-800">
                        <p><strong>Fabric:</strong> {d.Fabric}</p>
                        <p><strong>Orientation:</strong> {d.Orientation}</p>
                        <p><strong>Compliance:</strong> {d.Compliance}</p>
                        <p><strong>Comfort:</strong> {d.Comfort}</p>
                        <p><strong>Circularity:</strong> {d.Circularity}</p>
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{ stroke: '#8884d8', strokeWidth: 1 }}
              />
              <Legend />
              <Scatter
                name="Data Points"
                data={data}
                shape={(props: any) => <CustomDot {...props} priority={priority} />}
                opacity={1}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {/* CTA Section */}
        <div className={`mt-8 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} flex flex-col items-center`}>
          <div className="text-lg font-semibold text-gray-800 mb-2 text-center">See how the Five C Framework helps you prioritise the right decisions.</div>
          <button className="bg-[#484AB7]  text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-all">Try the full toolset</button>
        </div>
      </div>
    </div>
  );
}