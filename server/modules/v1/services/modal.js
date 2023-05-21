var asyncLoop = require('node-async-loop');
const globals = require('../../../config/constant');
const { request } = require('express');
const e = require('express');
var randomtoken = require('rand-token').generator();
const common = require('../../../config/common');
const emailtemplate = require('../../../config/template');
const user = require('../auth/modal');
const { ifError } = require('assert');
const { error } = require('console');

con = require('../../../config/database');

var Auth = {

    addpost : (request,req,user_id,callback) => {
        var postData = {
            user_id : user_id,
            image : req.file.filename,
            image : req.file.filename
        }
        con.query(`INSERT INTO tbl_post SET ?`,[postData],(error,result)=>{
            if (!error) {
                callback('1',{keyword: 'post created succesfully'},result)
            } else {
                callback('0',{keyword: 'somthing went wrong'},{})
            }
        })
    },

    allpost : (request,callback)=>{
      con.query(`SELECT p.id,p.user_id,concat('${globals.BASE_URL}','${globals.user}',u.profile) as profile,u.first_name,u.last_name,u.mobile,u.email,concat('${globals.BASE_URL}','${globals.post}',p.image) as image,p.description,p.is_active,p.is_delete,p.created_at,p.updated_at, 

      CASE
          WHEN TIMESTAMPDIFF(SECOND, p.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, p.created_at, NOW()), ' seconds ago')
          WHEN TIMESTAMPDIFF(MINUTE, p.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE,p.created_at, NOW()), ' minutes ago')
          WHEN TIMESTAMPDIFF(HOUR, p.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, p.created_at, NOW()), ' hours ago')
          WHEN TIMESTAMPDIFF(DAY, p.created_at, NOW()) < 30 THEN CONCAT(TIMESTAMPDIFF(DAY, p.created_at, NOW()), ' days ago')
          WHEN TIMESTAMPDIFF(MONTH, p.created_at, NOW()) < 12 THEN CONCAT(TIMESTAMPDIFF(MONTH, p.created_at, NOW()), ' months ago')
          ELSE CONCAT(TIMESTAMPDIFF(YEAR, p.created_at, NOW()), ' years ago')
        END AS post_created_at
      
      FROM tbl_post p 
            JOIN tbl_user u ON p.user_id = u.id
            WHERE p.is_active = 1 AND p.is_delete = 0 ORDER BY created_at DESC;`,(error,result)=>{
        if (!error && result.length > 0) {
            callback('1',{keyword : "post data"},result);
        } else {
            callback('0',{keyword: 'somthing went wrong'},{})
        }
      })
    },

    post_like : (request,user_id,callback) => {
   Auth.like(request,user_id,(data)=>{
    if (data == false) {
        var likeData = {
            post_id : request.post_id,
            user_id : user_id
        }
        con.query(`INSERT INTO tbl_post_like SET ?`,[likeData],(error,result)=>{
            if (!error) {
                callback('1',{keyword:"post liked"},result);
            } else {
                callback('0',{keyword:"data not found"},{});
            }
        })
    } else {
        con.query(`DELETE FROM tbl_post_like WHERE post_id =? AND user_id = ?`,[request.post_id,user_id],(error,result)=>{
            if (!error) {
              callback('1',{keyword:"post dislike"},result);
            } else {
                callback('0',{keyword:"something went wrong"},{});
            }
        })
    }
   })
    },

    like : (request,user_id,callback) => {
      con.query(`SELECT * FROM tbl_post_like WHERE post_id = ? AND user_id = ?`,[request.post_id,user_id],(error,result)=>{
        if (!error && result.length > 0) {
            callback(result[0])
        } else {
            callback(false)
        }
      })
    }


}

module.exports = Auth;