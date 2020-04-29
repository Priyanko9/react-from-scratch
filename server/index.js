import React from 'react';
import express from 'express';
import {StaticRouter} from 'react-router-dom';
import fs from 'fs';
import {renderToNodeStream} from 'react-dom/server';
import App from '../src/App';
const PORT=process.env.PORT || 3000;

const app=express();
const file=fs.readFileSync('dist/index.html').toString();
const part1=file.split("Loading ...");

app.use('/',express.static("dist"));
app.use((req,res)=>{
    res.write(part1[0]);
    const reactMarkUp=(
    <StaticRouter url={req.url}>
            <App />
    </StaticRouter>)
    let stream=renderToNodeStream(reactMarkUp);
    stream.pipe(
        res,{end:false}
    )
    stream.on('end',()=>{
        res.write(part1[1]);
        res.end();
    })
})
console.log("listening on port:"+PORT);
app.listen(PORT);
