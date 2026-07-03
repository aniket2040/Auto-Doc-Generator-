import {
    Routes,
    Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import TemplatePage from "./pages/TemplatePage";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/templates/:templateId"
                element={<TemplatePage />}
            />

        </Routes>

    );

}

export default App;