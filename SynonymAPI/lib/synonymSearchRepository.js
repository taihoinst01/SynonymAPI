'use strict';

var dbHelper = require('./dbHelper');
var dbConfig = require('./dbConfig');
var sql = require('mssql');

module.exports = {
    // 스웨거 스팩상 라우터에서 패스 파라미터는 단일항목만 지원함

    // TODO : 삭제 (사용안함)
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
    // TODO : 삭제 (사용안함)
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
    },
    /**
    * summary: 유의어 목록 조회
    */
    selectWordSynonList: function (req, res) {
        var wordParam = req.query.word;
        var sqlText =
            "       SELECT SS.WORD_SEQ as wordSeq,     \n"
            + "            SS.SYNON_SEQ as synonSeq,   \n"
            + "            SS.WORD as word,            \n"
            + "            SS.WORD_SYNON as wordSynon, \n"
            + "            SS.WORD_SYNON_SCORE as wordSynonScore, \n"
            + "            SS.SYNONYM as synonym       \n"
            + "     FROM TBL_WORD_SYNON_SCORE SS       \n"
            + "     WHERE SS.WORD = '" + wordParam + "' \n"
            + "     ORDER BY SS.WORD_SEQ, SS.WORD_SYNON_SCORE DESC, SS.SYNON_SEQ \n";

        return dbHelper.sqlSelect(sqlText, res);
    },
    /**
    * summary: 유의어 스코어 수정 (+1)
    */
    updateWordSynonScore: function (req, res) {
        var sqlText = [];
        sqlText.push(
            "       UPDATE TBL_WORD_SYNON_SCORE \n"
            + "     SET WORD_SYNON_SCORE = (WORD_SYNON_SCORE + 1) \n"
            + "     WHERE WORD_SEQ = " + req.body[0].wordSeq + " \n"
            + "      AND SYNON_SEQ = " + req.body[0].synonSeq + " \n"
        );

        return dbHelper.sqlExecute(sqlText, res)
    },
    /**
    * summary: 유의어 등록
    */
    insertWordSynonScore: function (req, res) {
        var sqlText = [];
        sqlText.push(
            "       INSERT INTO TBL_WORD_SYNON_SCORE (WORD_SEQ, WORD, WORD_SYNON, WORD_SYNON_SCORE, SYNONYM) \n"
            + "     SELECT WORD_SEQ, WORD, '" + req.body[0].wordSynon + "', 0, SYNONYM FROM TBL_WORD_SYNON  \n"
            + "      WHERE WORD_SEQ = " + req.body[0].wordSeq + "\n"
            /** + "        AND WORD     = '" + req.body[0].word + "' \n" */
        );

        return dbHelper.sqlExecute(sqlText, res);
    }
};