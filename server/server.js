const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"prat8800",
    database:"tribes",
    connectionLimit:10
});

pool.getConnection((err,connection)=>{
    if(err)
    {
        console.error("Error",err);
    }
    else
    {
        console.log("Database connected");
    }
})

app.post("/admin",(req,res) => {
    const {email,password} = req.body;
    console.log(email);
    console.log(password);
    if(email === "pratheek@gmail.com" && password === "pass@123")
    {
        res.send("Sucess");
    }
    else{
        res.send("not");
    }

})

app.post("/tribedata",(req, res) => {
    // const {div_id} = req.body;
    const {id} = req.body;
    console.log(id)
    pool.query(
        'SELECT * FROM tribes_data WHERE div_id = ?',
        id,
        (err, results) =>{
            if(err)
            {
                console.error(err);
                res.send("Internal server error");
            }
            else
            {
                res.send(results);
            }
        }
    )
})

app.post("/tables",(req, res)=>{
    pool.query(
        "SHOW TABLES","",
        (err, results) =>{
            if(err)
            {
                res.send("DatabaseError")
            }
            else
            {
                res.send(results)
            }
        }
    )
})

app.post("/tribeinfo",(req, res)=>{
    console.log(req.body);
    const [idVal] = req.body;
    console.log(idVal);

    pool.query(
        `SELECT  c.practice_name, c.festival
        FROM tribes_data t
        JOIN tribal_data_culture r ON t.tribe_id = r.tribe_id
        JOIN tribal_culture c ON r.practice_id = c.practice_id
        WHERE t.tribe_id = ${idVal};`,
        (err, results)=>{
            if(err)
            {
                console.error(err);
                res.send(err);
            }
            else
            {
                console.log(results)
                pool.query
                (
                    `SELECT t.tribe_name, e.literacy_rate
                    FROM tribes_data t
                    JOIN tribal_education e ON t.tribe_id = e.tribe_id
                    WHERE t.tribe_id = ${idVal};`,
                    (err1, results1)=>{
                        if(err1)
                        {
                            console.error(err1);
                            res.send(err1);
                        }
                        else
                        {
                            console.log(results,results1);
                            res.send([results,results1])
                        }
                    }
                )
            }
        }
    )

})

app.post("/form",(req, res)=>{
    var [tableNAme] =req.body;
    if(tableNAme == 'logins')
    {
        console.log("logins")
        pool.query(
            "SHOW COLUMNS FROM  logins","",
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log("Error")
                }
                else
                {
                    res.send(results);
                }
            }
        )
    }
    else if(tableNAme == "tribal_culture")
    {
        console.log("tribal_culture")
        pool.query(
            "SHOW COLUMNS FROM  tribal_culture","",
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log("Error")
                }
                else
                {
                    res.send(results);
                }
            }
        )
    }
    else if(tableNAme == "tribes_data")
    {
        console.log("tribes_data")
        pool.query(
            "SHOW COLUMNS FROM  tribes_data","",
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log("Error")
                }
                else
                {
                    res.send(results);
                }
            }
        )
    }
    else if(tableNAme == "tribal_data_culture")
    {
        pool.query(
            "SHOW COLUMNS FROM  tribal_data_culture","",
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log("Error")
                }
                else
                {
                    res.send(results);
                }
            }
        )
    }
    else if(tableNAme == "tribal_education")
    {
        pool.query(
            "SHOW COLUMNS FROM  tribal_education","",
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log("Error")
                }
                else
                {
                    res.send(results);
                }
            }
        )

    }
    else
    {

    }

})

app.post("/insert",(req,res)=>{
    const [tableID] = (req.body.table);
    const InsertDataVal = req.body.data;
    console.log(tableID)
    console.log(InsertDataVal)

    if(tableID=="logins")
    {   
        pool.query(
            `INSERT INTO logins(id, name, email, password) VALUES (${InsertDataVal.id},\'${InsertDataVal.name}\',\'${InsertDataVal.email}\',\'${InsertDataVal.password}\');`,
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log(err);
                    res.send(err);
                }
                else
                {
                    console.log("Records Inserted")
                }
            }
        )
    }
    else if(tableID == "tribal_culture")
    {
        pool.query(
            `INSERT INTO tribal_culture(practice_id, practice_name, region, festival) VALUES (${InsertDataVal.practice_id},\'${InsertDataVal.practice_name}\',\'${InsertDataVal.region}\',\'${InsertDataVal.festival}\');`,
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log(err);
                    res.send(err);
                }
                else
                {
                    console.log("Records Inserted")
                }
            }
        )
    }
    else if(tableID == "tribes_data")
    {
        pool.query(
            `INSERT INTO tribes_data(tribe_id, tribe_name,region,tribe_language,population,div_id) VALUES (${InsertDataVal.tribe_id},\'${InsertDataVal.tribe_name}\',\'${InsertDataVal.region}\',\'${InsertDataVal.tribe_language}\',${InsertDataVal.population},${InsertDataVal.div_id});`,
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log(err);
                    res.send(err);
                }
                else
                {
                    res.send("Records Inserted")
                    console.log("Records Inserted")
                }
            }
        )

    }
    else if(tableID == "tribal_data_culture")
    {
        pool.query(
            `INSERT INTO tribal_data_culture(relation_id, tribe_id, practice_id) VALUES (${InsertDataVal.relation_id},${InsertDataVal.tribe_id},${InsertDataVal.practice_id});`,
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log(err);
                    res.send(err);
                }
                else
                {
                    console.log("Records Inserted")
                }
            }
        )

    }
    else if(tableID == "tribal_education")
    {
        pool.query(
            `INSERT INTO tribal_education(ed_id, tribe_id, literacy_rate) VALUES (${InsertDataVal.ed_id},${InsertDataVal.tribe_id},${InsertDataVal.literacy_rate});`,
            (err, results)=>{
                if(err)
                {
                    console.error(err);
                    console.log(err);
                    res.send(err);
                }
                else
                {
                    console.log("Records Inserted")
                }
            }
        )

    }
    else
    {
        res.send("Not Found")
    }
})

//Update
app.post("/update",(req, res)=>{
    const [tableID] = (req.body.table);
    const InsertDataVal = req.body.data;
    console.log(tableID);
    console.log(InsertDataVal);  
    const updates = []; 
    Object.keys(InsertDataVal).map((item, index)=>{
        updates.push(`${item}=\'${Object.values(InsertDataVal)[index]}\'`)
    })
    console.log(updates)
    const updateClause = updates.join(", ");
    console.log(updateClause);

    pool.query(
        `SELECT K.COLUMN_NAME FROM  
        INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
        JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE K
        ON K.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
        WHERE K.TABLE_NAME=\'${tableID}\'
        AND K.TABLE_SCHEMA='tribes'  
        AND T.CONSTRAINT_TYPE='PRIMARY KEY' LIMIT 1;`,
        (err, results)=>{
            if(err)
            {
                console.error(err);
                res.send(err);
            }
            else
            {
                const pk = results[0].COLUMN_NAME;
                console.log(pk);
                const idVal = InsertDataVal[pk];
                pool.query(
                    `SELECT * FROM ${tableID} WHERE ${pk} = \'${idVal}\';`,
                    (err1, results1) =>{
                        if(err1)
                        {
                            console.error(err1);
                            res.send(err1);
                        }
                        else
                        {
                            if(results1.length>0)
                            {
                                pool.query(
                                    `UPDATE ${tableID} SET ${updateClause} WHERE ${pk} = \'${idVal}\';`,
                                    (err2, results2)=>{
                                        if(err2)
                                        {
                                            console.error(err2);
                                            res.send(err2);
                                        }
                                        else
                                        {
                                            res.send("Record Updated");
                                        }
                                    }
                                )
                            }
                            else
                            {
                                res.send("Record Not Found");
                            }
                        }
                    }
                )
            }
        }
    )
})

app.post("/where",(req,res)=>{
    const datas = req.body;
    const tableName = String(datas.table);
    const idName = datas.id
    console.log(tableName,idName);
    pool.query(
        `SELECT K.COLUMN_NAME FROM  
        INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
        JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE K
        ON K.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
        WHERE K.TABLE_NAME=\'${tableName}\'
        AND K.TABLE_SCHEMA='tribes'  
        AND T.CONSTRAINT_TYPE='PRIMARY KEY' LIMIT 1;`,
        (err, results)=>{
            if(err)
            {
                console.log(err);
                res.send(err)
            }
            else
            {
                console.log(results[0].COLUMN_NAME);
                const pk = results[0].COLUMN_NAME;
                console.log(tableName,pk,idName)
                pool.query
                (
                    `SELECT * FROM ${tableName} WHERE ${pk} = \'${idName}\';`,
                    (err1, results1)=>{
                        if(err1)
                        {
                            console.error(err1);
                            res.send(err1);
                        }
                        else
                        {
                            if(results1.length>0)
                            {
                                pool.query(
                                    `DELETE FROM ${tableName} WHERE ${pk} = \'${idName}\';`,
                                    (errIn, resultsIn)=>{
                                        if(errIn)
                                        {
                                            console.error(errIn);
                                            res.send(errIn)
                                        }
                                        else
                                        {
                                            console.log("Deleted")
                                            res.send("Deleted");
                                        }
                                    }
                                )
                            }
                            else
                            {
                                console.log("Not Present");
                                res.send("Not Found")
                            }
                        }
                    }
                )
            }
        }
    ) 
})

app.listen(8080, () => {
    console.log("Server : 8080")
})