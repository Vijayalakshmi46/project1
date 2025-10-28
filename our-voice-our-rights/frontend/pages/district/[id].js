import { useRouter } from 'next/router'
import useSWR from 'swr'
import DashboardCard from '../../components/DashboardCard'
const fetcher = url => fetch(url).then(r=>r.json())
export default function District(){
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id?`/api/dashboard/${id}`:null, fetcher)
  if(!data) return <div style={{padding:20}}>Loading...</div>
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h2 style={{fontSize:22}}>{data.districtName} — {data.month}</h2>
      {data.stale && <div style={{background:'#ffe',padding:8}}>Data may be outdated (last updated: {data.lastUpdated})</div>}
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <DashboardCard title="People benefited | மக்கள் பயன்" value={data.peopleBenefited} />
        <DashboardCard title="Person-days | நபர் நாட்கள்" value={data.personDays} />
        <DashboardCard title="Fund utilised (%) | நிதி பயன்பாடு (%)" value={data.fundUtilPercent} />
      </div>
      <section style={{marginTop:20}}>
        <h3>Last 12 months | கடைசி 12 மாதங்கள்</h3>
        <ul>
          {data.history.map(h=> (
            <li key={`${h.year}-${h.month}`}>{h.monthName} {h.year}: {h.peopleBenefited} people</li>
          ))}
        </ul>
      </section>
      <div style={{marginTop:20}}>
        <button onClick={()=>{
          const t = `In ${data.districtName} (${data.month}) ${data.peopleBenefited} people got work.`
          if(navigator.share) navigator.share({text:t})
          else alert(t)
        }}>Share via WhatsApp/SMS | பகிர்</button>
      </div>
    </main>
  )
}
