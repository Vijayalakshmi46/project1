const express = require('express')
const { Pool } = require('pg')
const app = express()
app.use(express.json())
const pool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'ovor',
  port: process.env.PGPORT || 5432
})

app.get('/api/dashboard/:id', async (req,res)=>{
  const id = req.params.id
  const q = `SELECT * FROM mgnrega_snapshots WHERE district_id=$1 ORDER BY year DESC, month DESC LIMIT 1`;
  const r = await pool.query(q,[id])
  if(r.rowCount===0) return res.json({districtId:id,districtName:'Demo',peopleBenefited:0,personDays:0,fundUtilPercent:0,history:[]})
  const row = r.rows[0]
  const hist = await pool.query(`SELECT year,month,people_benefited FROM mgnrega_snapshots WHERE district_id=$1 ORDER BY year DESC, month DESC LIMIT 12`,[id])
  const history = hist.rows.map(x=>({year:x.year,month:x.month,monthName:new Date(x.year, x.month-1).toLocaleString('default',{month:'short'}),peopleBenefited:x.people_benefited})).reverse()
  res.json({
    districtId:id,
    districtName: row.district_name || 'Demo',
    month: `${row.month}-${row.year}`,
    peopleBenefited: row.people_benefited,
    personDays: row.persondays_provided,
    fundUtilPercent: row.fund_util_percent,
    history,
    lastUpdated: row.created_at,
    stale: false
  })
})

app.get('/api/locate', (req,res)=>{
  const {lat,lng} = req.query
  if(lat && parseFloat(lat)>10) return res.json({districtId:1})
  return res.json({districtId:2})
})

app.listen(4000, ()=> console.log('Backend running on 4000'))
