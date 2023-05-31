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

    addpost: (request, req, user_id, callback) => {
        var postData = {
            user_id: user_id,
            image: req.file.filename,
            description: request.description
        }
        con.query(`INSERT INTO tbl_post SET ?`, [postData], (error, result) => {
            console.log(error);
            if (!error) {
                callback('1', { keyword: 'post created succesfully' }, result)
            } else {
                callback('0', { keyword: 'somthing went wrong' }, {})
            }
        })
    },

    // SELECT p.id,concat('${globals.BASE_URL}','${globals.post}',p.image) as image,(SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id) as likes,p.description,p.is_active,p.is_delete,p.created_at,p.updated_at,u.id as userId,concat('${globals.BASE_URL}','${globals.user}',u.profile) as profile,u.id,u.first_name,u.last_name,u.mobile,u.email,u.is_active,u.created_at,ifnull(pl.is_like,0) as is_like,df.token, 

    //   CASE
    //            WHEN TIMESTAMPDIFF(SECOND, p.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, p.created_at, NOW()), ' seconds ago')
    //            WHEN TIMESTAMPDIFF(MINUTE, p.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE,p.created_at, NOW()), ' minutes ago')
    //            WHEN TIMESTAMPDIFF(HOUR, p.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, p.created_at, NOW()), ' hours ago')
    //            WHEN TIMESTAMPDIFF(DAY, p.created_at, NOW()) < 30 THEN CONCAT(TIMESTAMPDIFF(DAY, p.created_at, NOW()), ' days ago')
    //            WHEN TIMESTAMPDIFF(MONTH, p.created_at, NOW()) < 12 THEN CONCAT(TIMESTAMPDIFF(MONTH, p.created_at, NOW()), ' months ago')
    //            ELSE CONCAT(TIMESTAMPDIFF(YEAR, p.created_at, NOW()), ' years ago')
    //          END AS post_created_at

    //  FROM tbl_post p
    //  JOIN tbl_user u ON p.user_id = u.id
    //  LEFT JOIN tbl_post_like pl ON p.id = pl.post_id
    //  LEFT JOIN tbl_device_info df ON u.id = df.user_id
    //  WHERE token = ?
    //  ORDER BY p.created_at DESC;


    //     SELECT
    //       p.id,
    //       p.user_id,
    //       CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,
    //       (SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id AND pl.is_like = 1) AS likes,
    //       (
    //           SELECT
    //               CASE
    //                   WHEN pl.is_like = 1 THEN 1
    //                   ELSE 0
    //               END
    //           FROM tbl_post_like pl
    //           WHERE p.id = pl.post_id AND pl.user_id = ${user_id}
    //       ) AS post_like
    //   FROM
    //       tbl_post p
    //   LEFT JOIN tbl_post_like pl ON p.id = pl.post_id
    //   GROUP BY p.id;

    allpost: (req, user_id, callback) => {
        con.query(`SELECT
      p.id,
     CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,u.login_status,
      CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,
      (SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id AND pl.is_like = 1) AS likes,
      (
          SELECT
              CASE
                  WHEN pl.is_like = 1 THEN 1
                  ELSE 0
              END
          FROM tbl_post_like pl
          WHERE p.id = pl.post_id AND pl.user_id = ${user_id}
      ) AS post_like
  FROM
      tbl_post p
  LEFT JOIN tbl_post_like pl ON p.id = pl.post_id
  LEFT JOIN tbl_user u ON pl.user_id = u.id
  GROUP BY p.id ORDER BY p.created_at DESC`, (error, result) => {
            console.log(error);
            if (!error && result.length > 0) {

                callback('1', { keyword: "post data" }, result);
            } else {
                callback('0', { keyword: 'somthing went wrong' }, {})
            }
        })
    },

    post_like: (post_id, user_id, callback) => {
        Auth.like(post_id, user_id, (data) => {

            if (data == false) {
                var likeData = {
                    post_id: post_id,
                    user_id: user_id,
                    is_like: 1
                }
                con.query(`INSERT INTO tbl_post_like SET ?`, [likeData], (error, result) => {
                    console.log(error);
                    if (!error) {
                        Auth.like(post_id, user_id, (likeData) => {

                            callback('1', { keyword: "post liked" }, likeData);
                        })
                    } else {

                        callback('0', { keyword: "data not found" }, {});
                    }
                })
            } else {
                if (data[0].is_like == 1) {
                    con.query(`UPDATE tbl_post_like SET is_like = 0 WHERE post_id =? AND user_id = ?`, [post_id, user_id], (error, result) => {
                        if (!error) {
                            Auth.like(post_id, user_id, (likeData) => {
                                callback('1', { keyword: "post delete" }, likeData);
                            })
                        } else {
                            callback('0', { keyword: "something went wrong" }, {});
                        }
                    })
                }

                if (data[0].is_like == 0) {
                    con.query(`UPDATE tbl_post_like SET is_like = 1 WHERE post_id =? AND user_id = ?`, [post_id, user_id], (error, result) => {
                        if (!error) {
                            Auth.like(post_id, user_id, (likeData) => {
                                callback('1', { keyword: "post delete" }, likeData);
                            })
                        } else {
                            callback('0', { keyword: "something went wrong" }, {});
                        }
                    })
                }

            }
        })
    },

    like: (post_id, user_id, callback) => {
        con.query(`SELECT * FROM tbl_post_like WHERE post_id = ? AND user_id = ?`, [post_id, user_id], (error, result) => {
            if (!error && result.length > 0) {
                callback(result)
            } else {
                callback(false)
            }
        })
    },

    likeCount: (request, user_id, callback) => {
        con.query(`SELECT COUNT(pl.id) as likes FROM tbl_post_like pl WHERE pl.post_id = ? AND pl.user_id = ?`, [request.post_id, user_id], (error, result) => {
            if (!error && result.length > 0) {
                callback('1', { keyword: 'total likes' }, result);
            } else {
                callback('0', { keyword: 'something wrong' }, {});
            }
        })
    }


}

module.exports = Auth;