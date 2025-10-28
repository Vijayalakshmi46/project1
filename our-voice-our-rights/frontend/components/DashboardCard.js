export default function DashboardCard({title,value}){
  return (
    <div style={{border:'1px solid #ddd',padding:16,borderRadius:8,minWidth:180}}>
      <div style={{fontSize:14}}>{title}</div>
      <div style={{fontSize:22,fontWeight:'bold'}}>{value}</div>
      <div style={{marginTop:8}}>
        <button onClick={()=>{
          const u = new SpeechSynthesisUtterance(`${title}: ${value}`)
          window.speechSynthesis.speak(u)
        }}>🔊 Listen | கேளுங்கள்</button>
      </div>
    </div>
  )
}
