import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@pages/Layout";
import HomePage from "@pages/HomePage";
import FAQ from "@pages/FAQ";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
