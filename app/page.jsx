export default async function Home() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tweet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "🚀 Testing my Twitter bot!" }),
  });

  const data = await response.json();
  console.log(data);

  return (
    <div className="home_cont">
      <img src="/globe.svg" alt="globe icon" style={{width: "48px", height:"48px"}} />
      <h2 >Welcome Home Baby</h2>
    </div>
   
  );
}
