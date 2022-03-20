import { Component } from 'react';
import './App.css';
import { ColourBlockGrid } from './components/ColourBlockGrid';

const mobileSize: number = 600;

interface AppState {
	desktopView: boolean;
}

export class App extends Component<{}, AppState> {

	constructor(props: any) {
		super(props);

		this.state = { desktopView: window.matchMedia(`(min-width: ${mobileSize}px)`).matches }
	}

	componentDidMount() {
		const handler = (event: any) => this.setState({ desktopView: event.matches });
		window.matchMedia(`(min-width: ${mobileSize}px)`).addEventListener('change', handler);
	}

	render() {
		return (
			<div className="App">
				<ColourBlockGrid desktopView={this.state.desktopView} />
			</div>
		)
	}
}

export default App;
