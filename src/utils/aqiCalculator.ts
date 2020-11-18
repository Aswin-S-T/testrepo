
export const aqiCalculator = (paramName: any, value: any) => {
    var result = 0;
    var temp: any = paramName.toUpperCase();
    var paramFuncs: any = {
        SO2: convertSO2u3ToAqi,
        CO: convertCOu3ToAqi,
        O3: convertO3u3ToAqi,
        NH3: convertNH3u3ToAqi,
        NO2: convertNoXu3ToAqi,
        PM10: convertPM10u3ToAqi,
        PM2P5: convertPM25u3ToAqi,
    }
    if (paramFuncs[temp] != null) {
        result = paramFuncs[temp](value);
        //console.log("RES", temp, result);
    }
    return result;
}
const convertPM10u3ToAqi = function (value: any) {
    if (value <= 50)
        return value;
    if (value > 50 && value <= 100)
        return value;
    if (value > 100 && value <= 250)
        return 100 + (value - 100) * 100 / 150;
    if (value > 250 && value <= 350)
        return 200 + (value - 250);
    if (value > 350 && value <= 430)
        return 300 + (value - 350) * (100 / 80);
    if (value > 430 && value <= 510)
        return 400 + (value - 430) * (100 / 80);
    if (value > 510)
        return (500);
}
const convertPM25u3ToAqi = function (value: any) {

    if (value <= 30)
        return value * 50 / 30;
    if (value > 30 && value <= 60)
        return 50 + (value - 30) * 50 / 30;
    if (value > 60 && value <= 90)
        return 100 + (value - 60) * 100 / 30;
    if (value > 90 && value <= 120)
        return 200 + (value - 90) * 100 / 30;
    if (value > 120 && value <= 250)
        return 300 + (value - 120) * 100 / 130;
    if (value > 250 && value <= 380)
        return 400 + (value - 250) * 100 / 130;
    if (value > 380)
        return (500);
}
const convertSO2u3ToAqi = function (value: any) {

    if (value <= 40)
        return value * 50 / 40;
    if (value > 40 && value <= 80)
        return 50 + (value - 40) * 50 / 40;
    if (value > 80 && value <= 380)
        return 100 + (value - 80) * 100 / 300;
    if (value > 380 && value <= 800)
        return 200 + (value - 380) * (100 / 420);
    if (value > 800 && value <= 1600)
        return 300 + (value - 800) * (100 / 800);
    if (value > 1600 && value <= 2400)
        return 400 + (value - 1600) * (100 / 800);
    if (value > 2400)
        return (500);
}
const convertNoXu3ToAqi = function (value: any) {
    if (value <= 40)
        return value * 50 / 40;
    if (value > 40 && value <= 80)
        return 50 + (value - 40) * 50 / 40;
    if (value > 80 && value <= 180)
        return 100 + (value - 80) * 100 / 100;
    if (value > 180 && value <= 280)
        return 200 + (value - 180) * 100 / 100;
    if (value > 280 && value <= 400)
        return 300 + (value - 280) * (100 / 120);
    if (value > 400 && value <= 520)
        return 400 + (value - 400) * (100 / 120);
    if (value > 520)
        return (500);
}

const convertCOu3ToAqi = function (value: any) {
    if (value <= 1)
        return value * 50 / 1;
    if (value > 1 && value <= 2)
        return 50 + (value - 1) * 50 / 1;
    if (value > 2 && value <= 10)
        return 100 + (value - 2) * 100 / 8;
    if (value > 10 && value <= 17)
        return 200 + (value - 10) * (100 / 7);
    if (value > 17 && value <= 34)
        return 300 + (value - 17) * (100 / 17);
    if (value > 34 && value <= 51)
        return 400 + (value - 34) * (100 / 17);

    if (value > 51)
        return (500);
}

const convertO3u3ToAqi = function (value: any) {

    if (value <= 50)
        return value * 50 / 50;
    if (value > 50 && value <= 100)
        return 50 + (value - 50) * 50 / 50;
    if (value > 100 && value <= 168)
        return 100 + (value - 100) * 100 / 68;
    if (value > 168 && value <= 208)
        return 200 + (value - 168) * (100 / 40);
    if (value > 208 && value <= 748)
        return 300 + (value - 208) * (100 / 539);
    if (value > 748 && value <= 939)
        return 400 + (value - 400) * (100 / 539);
    if (value > 939)
        return (500);
}

const convertNH3u3ToAqi = function (value: any) {

    if (value <= 200)
        return value * 50 / 200;
    if (value > 200 && value <= 400)
        return 50 + (value - 200) * 50 / 200;
    if (value > 400 && value <= 800)
        return 100 + (value - 400) * 100 / 400;
    if (value > 800 && value <= 1200)
        return 200 + (value - 800) * (100 / 400);
    if (value > 1200 && value <= 1800)
        return 300 + (value - 1200) * (100 / 600);
    if (value > 1800 && value <= 2400)
        return 400 + (value - 1800) * (100 / 600);
    if (value > 2400)
        return (500);
}
