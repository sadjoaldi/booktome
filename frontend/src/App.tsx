import { useQuery } from "@tanstack/react-query";
import { trpc } from "./utils/trpc.ts";

function App() {
  const serverTestQuery = useQuery(trpc.testRoute.greeting.queryOptions());

  return (
    <div className="App">
      <p>server query: {serverTestQuery.data} </p>
      <h1>HOme</h1>
    </div>
  );
}

export default App;
