import { useRouter } from 'next/router'
export default function DistrictSelector(){
  const router = useRouter()
  async function useLocation(){
    if(!navigator.geolocation){
      alert('Geolocation not available')
      return
    }
    navigator.geolocation.getCurrentPosition(async pos=>{
      const {latitude,longitude}=pos.coords
      const res = await fetch(`/api/locate?lat=${latitude}&lng=${longitude}`)
      if(res.ok){
        const j = await res.json()
        if(j.districtId) router.push(`/district/${j.districtId}`)
        else alert('Could not auto-detect. Please select manually.')
      }
    }, ()=> alert('Allow location to auto-detect'))
  }
  return (
    <div>
      <button style={{fontSize:18,padding:12}} onClick={useLocation}>Use my location | என் இடம்</button>
      <div style={{marginTop:12}}>
        <label style={{display:'block'}}>Or select district: | வட்டம் தேர்வு செய்க:</label>
        <select onChange={e=>router.push(`/district/${e.target.value}`)}>
          <option value="">--choose--</option>
          <option value="1">Chennai | சென்னை</option>
          <option value="2">Coimbatore | கோயம்புத்தூர்</option>
        </select>
      </div>
    </div>
  )
}
