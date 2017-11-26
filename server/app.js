var express  =  require("express");

var cookieParser = require('cookie-parser');   // 方便操作cookies
var bodyParser = require('body-parser');   //  获取 请求的参数  
var async = require("async");

var app = express();   //获取所有express 对象

var server  = require("http").createServer(app);

// var host = "localhost";

// var host = "192.169.1.1";  // 开发环境

var host = "172.18.83.147" ;  // 内网地址

var port = 8008;


app.use(bodyParser.json());    // 接口  http://localhost:7000/login?username=qwer  ajax  req.body 
app.use(bodyParser.urlencoded({ extended: false })); // form 表单提交 
app.use(cookieParser());

// 处理跨域方法 jsonp
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

var getDb = require("./db");

app.get("/login",(req,res)=>{
    var username = req.query.username;
    var password = req.query.password;
    console.log("==========")
    console.log(req.query);
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            var user = db.collection("user");
            var data = {username:username,password:password}
            user.find(data,{_id:0}).toArray((err,result)=>{
                if(err) throw err;
                console.log("user数据查询成功");
                console.log(result);
                res.send(result);
                db.close();
            })
        }
    })
});

app.post("/register",(req,res)=>{
    var username = req.body.params.username;
    var password = req.body.params.password;
    console.log("==========")
    console.log(req.body);
    console.log(username);
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            async.waterfall([
                function(callback){
                    var user = db.collection("user");
                    user.find({username:username},{_id:0}).toArray((err,result)=>{
                        if(err) throw err;
                        console.log("user数据查询成功");
                        console.log(result);
                        console.log(result.length);
                        if(result.length>0){  //用户名已注册
                            callback(null,"0");
                        }else{
                            callback(null,"1")    //用户名没注册
                        }
                    })
                },
                function(arg,callback){
                    if(arg=="1"){
                        var user = db.collection("user");
                        var data = {username:username,password:password,imgid:"http://img.huaxi.net/userhead/1082044.jpg",rest:0,bei:0,flower:0}
                        user.insert(data,(err,result)=>{
                            if(err) throw err;
                            console.log("注册成功");
                            callback(null,"1");   //注册成功
                        })
                    }else{
                        callback(null,"0");   // 注册失败
                    }
                }
            ],function(err,result){
                res.send(result);
                db.close();
            })
            
        }
    })
});


app.get("/commond",(req,res)=>{
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            var commond = db.collection("commond");
            commond.find().toArray((err,result)=>{
                if(err) throw err;
                console.log("commond数据查询成功");
                res.send(result);
                db.close();
            })
        }
    })
});

app.get("/hot",(req,res)=>{
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            var hot = db.collection("hot");
            hot.find().toArray((err,result)=>{
                if(err) throw err;
                console.log("hot数据查询成功");
                res.send(result);
                db.close();
            })
        }
    })
});

app.get("/good",(req,res)=>{
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            var good = db.collection("good");
            good.find().toArray((err,result)=>{
                if(err) throw err;
                console.log("good数据查询成功");
                res.send(result);
                db.close();
            })
        }
    })
});

app.get("/news",(req,res)=>{
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            var news = db.collection("new");
            news.find().toArray((err,result)=>{
                if(err) throw err;
                console.log("new数据查询成功");
                res.send(result);
                db.close();
            })
        }
    })
});

app.get("/user",(req,res)=>{
    var username = req.query.username;
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            console.log("数据库连接成功")
            console.log(username)
            var user = db.collection("user");
            user.find({username:username},{_id:0}).toArray((err,result)=>{
                if(err) throw err;
                console.log("user数据查询成功");
                console.log(result[0])
                res.send(result[0]);
                db.close();
            })
        }
    })
});

app.get("/bookshelf",(req,res)=>{
    var bookid = req.query.bookid;
    console.log(bookid);
    if(bookid.length>0){
        bookid=bookid.map(item=>{
            return JSON.parse(item);
        })
        console.log(bookid)    
        getDb.conn((err,db)=>{
            if(err){
                res.send("数据库错误");
            }else{
                console.log("数据库连接成功")
                console.log(bookid)
                var detail = db.collection("detail");
                detail.find({$or:bookid},{_id:0}).toArray((err,result)=>{
                    if(err) throw err;
                    console.log("bookshelf数据查询成功");
                    if(result.length==1){
                        console.log(result);
                        res.send(result);
                    }else{
                        console.log(result);
                        res.send(result);
                    }
                    db.close();
                })
            }
        })
    }
    
});

app.get("/detail",(req,res)=>{
    var bookid = req.query.bookid;
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            console.log("数据库连接成功")
            console.log(bookid)
            var detail = db.collection("detail");
            detail.find({"vdata.list.id":bookid},{_id:0}).toArray((err,result)=>{
                if(err) throw err;
                console.log("detail数据查询成功");
                console.log(result[0]);
                res.send(result[0]);
                db.close();
            })
        }
    })
});

app.post("/bookshelf",(req,res)=>{
    var username = req.body.params.username;
    var bookid = req.body.params.bookid;
    console.log(req.body)
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            console.log("数据库连接成功")
            async.waterfall([
                function(callback){
                    var bookshelf = db.collection("bookshelf");
                    var data = {username:username,bookid:bookid};
                    bookshelf.find(data).toArray((err,result)=>{
                        if(err) throw err;
                        if(result.length>0){
                            callback(null,"1")   // 1 表示已经存在
                        }else{
                            callback(null,"0")   // 0 表示不存在
                        }
                    })
                },
                function(arg,callback){
                    if(arg=="0"){
                        var bookshelf = db.collection("bookshelf");
                        var data = {username:username,bookid:bookid};
                        bookshelf.insert(data,(err,result)=>{
                            if(err) throw err;
                            console.log("bookshelf数据插入成功");
                            callback(null,"1")     //  1 表示数据插入成功
                        })
                    }else{
                        callback(null,"0")        // 0 表示数据库已存在不需插入数据
                    }
                }
            ],function(err,result){
                res.send(result);
                db.close()
            })
            
        }
    })
})

app.get("/book",(req,res)=>{
    var username = req.query.username;
    console.log(req.query)
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            console.log("数据库连接成功")
            console.log(username)
            var book = db.collection("bookshelf");
            book.find({username:username},{_id:0}).toArray((err,result)=>{
                if(err) throw err;
                console.log("book数据查询成功");
                console.log(result);
                res.send(result);
                db.close();
            })
        }
    })
})

app.get("/del",(req,res)=>{
    var username = req.query.username;
    var bookid = req.query.id;
    getDb.conn((err,db)=>{
        if(err){
            res.send("数据库错误");
        }else{
            console.log("数据库连接成功")
            console.log(username)
            console.log(bookid)
            var bookshelf = db.collection("bookshelf");
            var data = {username:username,bookid:bookid}
            bookshelf.deleteOne(data,(err,result)=>{
                if(err) throw err;
                console.log("删除成功");
                res.send("删除成功")
                db.close();
            })
        }
    })
})






// vue 


// react


// angular























server.listen(port,host,()=>{
    console.log(`Server is running  at http://${host}:${port}`);
})