import { Component } from "react";
import CSS from 'csstype';

export interface ColourBlockContainerProps {
	height?: string;
	flexGrow?: number;
	vertical?: boolean;
	horizontal?: boolean;
}

export class ColourBlockContainer extends Component<ColourBlockContainerProps> {

	private height: string;
	private flexGrow: number;
	private isHorizontal: boolean;

	private colourBlockContainerStyle: CSS.Properties;

	constructor(props: any) {
		super(props);

		this.height = this.props.height !== undefined ? this.props.height : "auto"
		this.flexGrow = this.props.flexGrow !== undefined ? Math.floor(this.props.flexGrow) : 1;

		var hasVertical = this.props.vertical !== undefined && this.props.vertical === true;
		var hasHorizontal = this.props.horizontal !== undefined && this.props.horizontal === true;

		this.isHorizontal = !hasVertical || hasHorizontal;
	
		this.colourBlockContainerStyle = {
			display: "flex",
			height: this.height,
			flexGrow: this.flexGrow,
			flexDirection: this.isHorizontal ? "row" : "column"
		}
	}

	render() {
		return (
			<div style={this.colourBlockContainerStyle}>
				{this.props.children}
			</div>
		);
	}
}
