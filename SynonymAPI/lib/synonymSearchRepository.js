'use strict';

var dbHelper = require('./dbHelper');
var dbConfig = require('./dbConfig');
var sql = require('mssql');

module.exports = {
    // 스웨거 스팩상 라우터에서 패스 파라미터는 단일항목만 지원함

    selectWord: function (req, res) {
        //var args = dbHelper.sqlSelectParameters(req);
        var sqlText =
            "       SELECT WORD \n"
            + "            ,SYNONYM \n"
            + "     FROM TBL_SYNONYM \n"
            + "     WHERE WORD = '" + req.query.word + "' \n";
        //console.log(res);
        return dbHelper.sqlSelect(sqlText, res);
    },
    updateWord: function (req, res) {
        var sqlText =
            "   SELECT WORD \n" +
            "   FROM TBL_SYNONYM \n" +
            "   WHERE WORD LIKE '%" + req.body[0].word + "%' \n";

        dbHelper.sqlSelect(sqlText, res)

        
        console.log(res);

        var sqlText =
            "       UPDATE TBL_SYNONYM SET "
            + "     SYNONYM = " + req.query.synonym + "\n"
            + "     WHERE WORD LIKE '%" + req.query.word + "%' \n";

        return dbHelper.sqlExecute(sqlText, res);
    }
};