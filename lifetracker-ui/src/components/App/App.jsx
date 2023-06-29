import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRoute>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Only if the user is logged in */}
          <Route path="/activity" element={<ActivityPage />} />
          {/*Only if the user is logged in*/}
          <Route path="/nutrition/*" element={<NutritionPage />} />
          {/*Anything else renders*/}
        </Routes>
      </BrowserRoute>
    </div>
  );
}

export default App;
