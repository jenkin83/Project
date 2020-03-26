
class ParamXML {

    constructor()
    {
        
    }

    readXml(pathFile){
        var fs = require('fs');
        var xml2js = require('xml2js');
        
        var xmlData = "";
        var jsonData = "";

        //xml->json
        //xml2js默认会把子子节点的值变为一个数组, explicitArray设置为false
        var xmlParser = new xml2js.Parser({explicitArray : false});
        //json->xml
        var jsonBuilder = new xml2js.Builder();

        //读取xml文件
        xmlData = fs.readFileSync(pathFile);
        
        // xml -> json
        xmlParser.parseString(xmlData, (err, result) => {
            if (err) {
                console.error(err);
            }
            //将返回的结果再次格式化
            jsonData = result;
            console.log(JSON.stringify(jsonData));
        });

        return jsonData;
    }

    updateStation() {
        var version = require('./version');
        var line = require('./line');
        var station = require('./station');
        var lineStation = require('./line-station');

        var jsonData = this.readXml('./param/Station');
        if (jsonData){
            // 更新version表
            version.truncate()
            .then(() => {version.create(jsonData.Station.Version.$)})         
            .catch(err => {
                console.log(err);
            });

            // 更新line表
            line.truncate()
            .then(() => {
                for(let i = 0; i < jsonData.Station.LineBaseInfo.BasicInfo.length; i++)
                {
                    line.create(jsonData.Station.LineBaseInfo.BasicInfo[i].$);
                }
            })
            .catch(err => {
                console.log(err);
            });

            // 更新station表
            station.truncate()
            .then(() => {
                for(let i = 0; i < jsonData.Station.StationBaseInfo.BasicInfo.length; i++)
                {
                    station.create(jsonData.Station.StationBaseInfo.BasicInfo[i].$);
                }
            })
            .catch(err => {
                console.log(err);
            });

            // 更新line-station表
            lineStation.truncate()
            .then(() => {
                var record;
                for(let i = 0; i < jsonData.Station.LineBaseInfo.BasicInfo.length; i++)
                    for(let j = 0; j < jsonData.Station.LineBaseInfo.BasicInfo[i].StationList.length; j++)
                {
                    record = {
                        'LineId' : jsonData.Station.LineBaseInfo.BasicInfo[i].$.Id,
                        'StationId' : jsonData.Station.LineBaseInfo.BasicInfo[i].StationList[j].$.StationBaseId,
                        'SortId' : jsonData.Station.LineBaseInfo.BasicInfo[i].StationList[j].$.SortId
                    };
                    lineStation.create(record);
                }
            })
            .catch(err => {
                console.log(err);
            });

        }
    }
}

var paramXML = new ParamXML();

module.exports = paramXML;