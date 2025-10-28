import Link from 'next/link'
import DistrictSelector from '../components/DistrictSelector'
export default function Home(){
  return (
    <main style={{padding:20,fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:26}}>Our Voice, Our Rights</h1>
      <p>Choose district or use location</p>
      <DistrictSelector/>
      <p style={{marginTop:20}}>Demo districts (click):</p>
      <ul>
        <li><Link href="/district/1">Chennai</Link></li>
        <li><Link href="/district/2">Coimbatore</Link></li>
      </ul>
    </main>
  )
}
