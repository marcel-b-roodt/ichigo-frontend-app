import { Component } from "react";
import CSS from "csstype"
import { PX_PER_UNIT } from "./ColourBlockGrid";

export interface ColourBlockProps {
    customHeight: boolean;
    colour: string;
    flexGrow: number;
    textValue: string;
	changeColour: () => void;
}

export interface ColourBlockState {
    currentColour: string
}

export class ColourBlock extends Component<ColourBlockProps, ColourBlockState> {

    private colourBlockStyle: CSS.Properties;

	constructor(props: any) {
		super(props);

        this.colourBlockStyle = {
            minHeight: (this.props.customHeight ? "auto" : `${1 * PX_PER_UNIT}px`),
            backgroundColor: this.props.colour,
            display: "flex",
            flexGrow: this.props.flexGrow,
            textAlign: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            margin: "8px",
            fontSize: "16pt"
        }
	}

    componentDidUpdate()
    {
        this.colourBlockStyle = {
            minHeight: (this.props.customHeight ? "auto" : `${1 * PX_PER_UNIT}px`),
            backgroundColor: this.props.colour,
            display: "flex",
            flexGrow: this.props.flexGrow,
            textAlign: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            margin: "8px",
            fontSize: "16pt"
        }
    }

	render() {
		return (
			<div style={this.colourBlockStyle}
                onClick={this.props.changeColour}>
                {this.props.textValue}  
            </div>
		);
	}
}
