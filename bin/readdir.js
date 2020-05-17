#!/usr/bin/env node
'use strict';

const readify = require('readify');
const {table} = require('table');
const {argv} = process;
const args = require('yargs-parser')(argv.slice(3), {
    string: ['sort', 'order'],
});

async function main() {
    const path = process.argv[2];
    const{sort, order} = args;
    const read = await readify(path, {sort, order});
    const data = [[
        'Name',
        'Size',
        'Date',
        'Owner',
        'Mode',
        'Type',
    
    ]];
    
    for (const item of read.files) {
        const columns = [
            item.name,
            item.size,
            item.date,
            item.owner,
            item.mode,
            item.type,
        ];
        
        data.push(columns);
    }
    
    const config = {
        drawHorizontalLine: (index) => {
            return index + 1;
        },
    };
    
    const newTable = table(data, config);
    console.log(newTable);
}

main().catch((err) => console.log(err.message));
