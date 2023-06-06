var asyncLoop = require('node-async-loop');
const globals = require('../../../config/constant');
const { request } = require('express');
const e = require('express');
var randomtoken = require('rand-token').generator();
const common = require('../../../config/common');
const emailtemplate = require('../../../config/template');
const user = require('../auth/modal');
const { ifError } = require('assert');
const { error, log } = require('console');

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

    allpost : (user_id,callback) =>{
        con.query(`SELECT p.id,p.user_id,CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,p.description,p.created_at,p.updated_at, CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,u.first_name,u.last_name,u.mobile,u.mobile,u.email,u.is_verified,u.is_private,u.login_status,(SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id) as like_count FROM tbl_post p
        JOIN tbl_user u ON p.user_id = u.id 
        JOIN tbl_request r ON  r.follow_id = p.user_id 
        WHERE r.user_id = ${user_id} AND r.status = "Accepted" AND (p.is_active = 1 AND p.is_delete = 0)`,(error,result)=>{
    if (!error && result.length > 0) {
      asyncLoop(result,(likes,next)=>{
        con.query(`SELECT * FROM tbl_post_like WHERE post_id = ${likes.id} AND user_id = ${user_id}`,(error,result1)=>{
            console.log(likes.id);
            if (!error && result1.length > 0) {
                likes.post_like = result1
                next()
            } else {
                likes.post_like = []
                next()
            }
        })
      },()=>{
        callback("1",{keyword : "all post"},result)
      })
    } else {
        callback('0',{keyword : "something went wrong"},result)
    }
})
     },


     uservisepost : (follow_id,user_id,callback) =>{
        console.log("user_id",user_id);
        con.query(`SELECT p.id,p.user_id,CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,p.description,p.created_at,p.updated_at, CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,u.first_name,u.last_name,u.mobile,u.mobile,u.email,u.is_verified,u.is_private,u.login_status,(SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id) as like_count FROM tbl_post p
        JOIN tbl_user u ON p.user_id = u.id 
        WHERE p.user_id = ${user_id} AND p.is_active = 1 AND p.is_delete = 0`,(error,result)=>{
    if (!error && result.length > 0) {
      asyncLoop(result,(likes,next)=>{
        con.query(`SELECT * FROM tbl_post_like WHERE post_id = ${likes.id} AND user_id = ${follow_id}`,(error,result1)=>{
            console.log(likes.id);
            if (!error && result1.length > 0) {
                likes.post_like = result1
                next()
            } else {
                likes.post_like = []
                next()
            }
        })
      },()=>{
        Auth.getsinglereq(follow_id,user_id,(Data)=>{
            if (Data == false) {
                callback('0', { keyword: 'somthing went wrong' }, {result:result,request : 0})
            }else{
            callback('1', { keyword: "post data" }, {result:result,request : Data});
        }
        })
        // callback("1",{keyword : "all post"},result)
      })
    } else {
        callback('0',{keyword : "something went wrong"},result)
    }
})
     },

 

    // uservisepost: (follow_id,user_id, callback) => {
    //  con.query(`SELECT
    //     p.id,u.id as post_user_id,
    //    CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,u.is_private,u.login_status,
    //     CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,
    //     (SELECT COUNT(pl.id) FROM tbl_post_like pl WHERE p.id = pl.post_id AND pl.is_like = 1) AS likes,
    //     (
    //         SELECT
    //             CASE
    //                 WHEN pl.is_like = 1 THEN 1
    //                 ELSE 0
    //             END
    //         FROM tbl_post_like pl
    //         WHERE p.id = pl.post_id AND pl.user_id = ${user_id}
    //     ) AS post_like
    // FROM
    //     tbl_post p
    // LEFT JOIN tbl_post_like pl ON p.id = pl.post_id
    // LEFT JOIN tbl_user u ON pl.user_id = u.id
    // WHERE p.user_id = ${user_id}
    // GROUP BY p.id ORDER BY p.created_at DESC;`, (error, result) => {
    //     console.log("error",result);
    //         if (!error && result.length > 0) {
    //             Auth.getsinglereq(follow_id,user_id,(Data)=>{
    //                 if (Data == false) {
    //                     callback('0', { keyword: 'somthing went wrong' }, {result:result,request : 0})
    //                 }else{
    //                 callback('1', { keyword: "post data" }, {result:result,request : Data});
    //             }
    //            })
    //         } else {
    //             callback('0', { keyword: 'somthing went wrong' }, {})
    //         }
    //     })
    // },

    myprofilepost: (user_id, callback) => {
        con.query(`SELECT
        p.id,u.id as post_user_id,
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
    WHERE p.user_id = ${user_id}
    GROUP BY p.id ORDER BY p.created_at DESC;`, (error, result) => {
            if (!error && result.length > 0) {
                callback('1', { keyword: "post data" }, result);
            } else {
                callback('0', { keyword: 'somthing went wrong' }, {})
            }
        })
    },

    user_post_like: (post_id, user_id, callback) => {
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
                    con.query(`DELETE FROM tbl_post_like WHERE post_id = ? AND user_id = ?`, [post_id, user_id], (error, result) => {
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
    },

    user_follow: (follow_id, user_id, callback) => {
       Auth.follow(follow_id,user_id,(followData)=>{
          if (followData == false) {
            var requestData = {
                user_id : user_id,
                follow_id : follow_id    
            }
             con.query(`INSERT INTO tbl_request SET ?`,[requestData],(error,result)=>{
               if (!error) {
                Auth.follow(follow_id,user_id,(rData)=>{
                    callback('1',{keyword : "request sent successfully"},rData)
                })
            } else {
                   callback('0',{keyword : "something went wrong"},{})
                
               }
             })
          } else {
            con.query(`DELETE FROM tbl_request WHERE user_id = ? AND follow_id = ?`,[user_id,follow_id],(error,result)=>{
                if (!error) {
                    callback('1',{keyword : "unfollow"},[])
                } else {
                    callback('0',{keyword : "something went wrong"},{})
                }
            })
          }
       })
    },

    follow: (follow_id, user_id, callback) => {
        con.query(`SELECT * FROM tbl_request WHERE user_id = ? AND follow_id = ?`, [user_id, follow_id], (error, result) => {
            if (!error && result.length > 0) {
                callback(result)
            } else {
                callback(false)
            }
        })
    },

    allrequest: (user_id, callback) => {
       con.query(`SELECT r.id,r.user_id,CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,r.created_at,r.updated_at FROM tbl_request r 
       JOIN tbl_user u ON r.user_id = u.id
       WHERE r.follow_id = ? AND status = "Pending";`,[user_id],(error,result)=>{
        if (!error && result.length > 0) {
            callback('1',{keyword : "user requests"},result)
        } else {
            callback('0',{keyword : "something went wrong"},{}) 
        }
       })
    },

    getreqdata: (follow_id,user_id, callback) => {
        con.query(`SELECT * FROM tbl_request r WHERE r.user_id = ? AND r.follow_id = ?;`,[follow_id,user_id],(error,result)=>{
         if (!error && result.length > 0) {
             callback('1',{keyword : "user requests"},result)
         } else {
             callback('0',{keyword : "something went wrong"},{}) 
         }
        })
     },

    requestConfirm: (follow_id,user_id, callback) => {
        // console.log(follow_id);
        console.log(user_id);
        con.query(`UPDATE tbl_request r SET r.status = 'Accepted' WHERE r.follow_id = ? AND r.user_id = ? `,[follow_id,user_id],(error,result)=>{
         if (!error && result.length > 0) {
             callback('1',{keyword : "user requests"},result)
         } else {
             callback('0',{keyword : "something went wrong"},{}) 
         }
        })
     },

     requestDelete: (follow_id,user_id, callback) => {
        con.query(`DELETE FROM tbl_request  WHERE follow_id = ${follow_id} AND user_id = ${user_id} `,(error,result)=>{
            console.log('error',error);
            // console.log('user_id',user_id);
         if (!error && result.length > 0) {
             callback('1',{keyword : "user requests"},result)
         } else {
             callback('0',{keyword : "something went wrong"},{}) 
         }
        })
     },

     findone: (request,user_id, callback) => {
         con.query(`SELECT u.id,CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username FROM tbl_user u WHERE u.username LIKE "%${request.search}%" AND u.id != ? AND u.role = 'user' AND u.is_active = 1 AND u.is_delete = 0;`,[user_id],(error,result)=>{
            console.log(error);
         if (!error && result.length > 0) {
             callback('1',{keyword : "user requests"},result)
         } else {
             callback('0',{keyword : "something went wrong"},{}) 
         }
        })
     },

     
     private_acc: (user_id, callback) => {

        con.query(`SELECT * FROM tbl_user WHERE id = ? AND role = 'user'`,[user_id],(error,result)=>{
            if (!error && result.length > 0) {
                if (result[0].is_private == 1) {
                    con.query(`UPDATE tbl_user SET is_private = '0' WHERE id = ? `,[user_id],(error,result)=>{
                        if (!error && result.length > 0) {
                            callback('1',{keyword : "account open"},result)
                        } else {
                            callback('0',{keyword : "something went wrong"},{}) 
                        }
                        })
                } else {
                    con.query(`UPDATE tbl_user SET is_private = '1' WHERE id = ? `,[user_id],(error,result)=>{
                        if (!error && result.length > 0) {
                            callback('1',{keyword : "account private"},result)
                        } else {
                            callback('0',{keyword : "something went wrong"},{}) 
                        }
                        })
                }
               
            } else {
                callback('0',{keyword : "something went wrong"},{}) 
            }
        })

       
     },

     getsinglereq : (user_id,follow_id,callback) => {
        con.query(`SELECT * FROM tbl_request WHERE user_id = ? AND follow_id = ?`,[user_id,follow_id],(error,result)=>{
            console.log(user_id);
            console.log(follow_id);
           if (!error && result.length > 0) {
             callback(result[0])
           } else {
            callback(false)
           }
        })
     },

//      Testing : (user_id,callback) =>{
//         con.query(`SELECT p.id,p.user_id,CONCAT('${globals.BASE_URL}', '${globals.post}', p.image) AS image,p.description,p.created_at,p.updated_at, CONCAT('${globals.BASE_URL}', '${globals.user}', u.profile) AS profile,u.username,u.first_name,u.last_name,u.mobile,u.mobile,u.email,u.is_verified,u.is_private,u.login_status FROM tbl_post p
//         JOIN tbl_user u ON p.user_id = u.id 
//         JOIN tbl_request r ON p.user_id = r.user_id 
//         WHERE r.follow_id = ${user_id} AND r.status = "Accepted" AND (p.is_active = 1 AND p.is_delete = 0)`,(error,result)=>{
//     if (!error && result.length > 0) {
//       asyncLoop(result,(likes,next)=>{
//         con.query(`SELECT * FROM tbl_post_like WHERE post_id = ${likes.id} AND user_id = ${user_id}`,(error,result1)=>{
//             console.log(likes.id);
//             if (!error && result1.length > 0) {
//                 likes.post_like = result1
//                 next()
//             } else {
//                 likes.post_like = []
//                 next()
//             }
//         })
//       },()=>{
//         callback("1",{keyword : "all post"},result)
//       })
//     } else {
//         callback('0',{keyword : "something went wrong"},result)
//     }
// })
//      }

     


}

module.exports = Auth;