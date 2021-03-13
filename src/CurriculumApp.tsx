import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CurriculumPage from './modules/curriculum/CurriculumPage.jsx';
import CurriculumPageToPrint from './modules/curriculum/CurriculumPageToPrint.jsx';

function CurriculumApp() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={CurriculumPage} />
          <Route path="/print" component={CurriculumPageToPrint} />
        </Switch>
      </Router>
    </div>
  );
}

export default CurriculumApp;
