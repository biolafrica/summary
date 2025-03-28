import Test from "./components/test";

export default async function Home() {

  return (
    <div className="home_cont">
      <img src="/globe.svg" alt="globe icon" style={{width: "48px", height:"48px"}} />
      <h2 >Welcome Home Baby</h2>
      <Test/>
      
    </div>
   
  );
}
