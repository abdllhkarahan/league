import React, { useState } from 'react';
import Calculations from './Calculations';

function App() {
		const [teams] = useState({
			"Fenerbahçe" : 1.8,
			"Galatasaray" : 1.2,
			"Beşiktaş" : 1.6,
			"Trabzonspor" : 1.3,
		})
		return (
			<Calculations teams={teams}/>
		);
	}

export default App;
