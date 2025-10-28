const fetch = require('node-fetch')
const { Pool } = require('pg')
const pool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'ovor',
  port: process.env.PGPORT || 5432
})

async function fetchAPI(){
  // Replace with actual data.gov.in MGNREGA endpoint & your API key
  const url = 'https://api.data.gov.in/resource/<resource-id>?api-key=YOUR_KEY&format=json'
  try{
    const res = await fetch(url)
    const json = await res.json()
    await pool.query('INSERT INTO raw_mgnrega_responses(api_endpoint,response) VALUES($1,$2)',[url,json])
    if(json.records && Array.isArray(json.records)){
      for(const r of json.records){
        const districtName = r.district_name || 'Demo'
        const year = parseInt(r.year) || 2025
        const month = parseInt(r.month) || 1
        const people = parseInt(r.people_benefited) || 0
        const persondays = parseInt(r.persondays) || 0
        const fundUtil = parseFloat(r.fund_util_percent) || 0
        await pool.query(`INSERT INTO mgnrega_snapshots(district_id,district_name,year,month,people_benefited,persondays_provided,fund_util_percent,source_raw)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8)
        `,[1,districtName,year,month,people,persondays,fundUtil, r])
      }
    }
    console.log('ETL done')
  }catch(e){
    console.error('ETL error',e)
  }
}

if(require.main === module) fetchAPI()
