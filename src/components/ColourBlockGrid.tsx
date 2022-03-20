import React, { Component, ReactElement } from "react";
import { ColourBlock } from "./ColourBlock";
import { ColourBlockContainer } from "./ColourBlockContainer";
import CSS from 'csstype';

export interface ColourBlockGridProps {
	desktopView: boolean;
}

export interface ColourBlockGridState {
	currentColours: string[]
}

export enum Colour {
	dazzlingBlue = "#146EFF",
	magentaPurple = "#5F0C93",
	violetTulip = "#8F9CFF",
	placidBlue = "#87D4FA",
	celosiaOrange = "#FF5E33",
	paloma = "#A6C2BA",
	hemlock = "#9CF5A6",
	radiantOrchid = "#AD59FF",
	freesia = "#FFDB00",
	sand = "#CCBA85",
	comfrey = "#3CA555",
	purpleHaze = "#707DD9",
	cayenne = "#F04270",
};

export const PX_PER_UNIT: number = 80;

export class ColourBlockGrid extends Component<ColourBlockGridProps, ColourBlockGridState> {

	private colourBlockGridStyle: CSS.Properties = {
		display: "flex",
		maxWidth: "1000px",
	}

	constructor(props: any) {
		super(props);

		this.state = { currentColours: this.shuffleArray(Object.values(Colour)) }
		
		this.colourBlockClick = this.colourBlockClick.bind(this);
		this.updateColourBlockGridColours = this.updateColourBlockGridColours.bind(this);
	}

	colourBlockClick(event: React.MouseEvent<HTMLElement>) {
		event.stopPropagation();
		this.updateColourBlockGridColours();
	}

	updateColourBlockGridColours() {
		this.setState({ currentColours: this.shuffleArray(Object.values(Colour)) }, () => this.forceUpdate());
	}

	private shuffleArray(array: any[]): any[]
	{
		return array.sort(() => (Math.random() > .5) ? 1 : -1);
	}

	private getColourBlock(blockNumber: number, flexGrow: number = 1, customHeight: boolean = false): ReactElement
	{
		var colourValue = this.state.currentColours[blockNumber-1];

		return <ColourBlock colour={colourValue} 
							flexGrow={flexGrow}
							textValue={blockNumber.toString()}
							changeColour={this.updateColourBlockGridColours}
							customHeight={customHeight} />
	}

	private calcUnits(units: number): string
	{
		return `${Math.floor(units) * PX_PER_UNIT}px`;
	}

	private generateDesktopView(): ReactElement
	{
		//This was a simple workaround to make sure React rerenders components when switching between desktop and mobile
		//Normally, keys would be handled in a more controlled manner
		var key: number = 1;

		return <div style={this.colourBlockGridStyle}>
					<ColourBlockContainer key={key++} vertical>
						<ColourBlockContainer key={key++} height={this.calcUnits(4)} horizontal>
									{this.getColourBlock(1)}
									<ColourBlockContainer key={key++} vertical>
										{this.getColourBlock(2)}
										<ColourBlockContainer key={key++} horizontal>
											{this.getColourBlock(3)}
											{this.getColourBlock(4)}
										</ColourBlockContainer>
									</ColourBlockContainer>
								</ColourBlockContainer>
								<ColourBlockContainer key={key++} height={this.calcUnits(3)} horizontal>
									<ColourBlockContainer key={key++} vertical>
										{this.getColourBlock(5, 1, true)}
										{this.getColourBlock(6, 2, true)}
									</ColourBlockContainer>
									{this.getColourBlock(7)}
									<ColourBlockContainer key={key++} vertical>
										{this.getColourBlock(8, 2, true)}
										{this.getColourBlock(9, 1, true)}
									</ColourBlockContainer>
								</ColourBlockContainer>
					</ColourBlockContainer>
				</div>
	}

	private generateMobileView(): ReactElement
	{
		//This was a simple workaround to make sure React rerenders components when switching between desktop and mobile
		//Normally, keys would be handled in a more controlled manner
		var key: number = 1; 

		return <div style={this.colourBlockGridStyle}>
					<ColourBlockContainer key={key++} vertical>
						{this.getColourBlock(1)}
						<ColourBlockContainer key={key++} horizontal>
							{this.getColourBlock(2)}
							{this.getColourBlock(3)}
						</ColourBlockContainer>
						{this.getColourBlock(4)}
						<ColourBlockContainer key={key++} horizontal>
							{this.getColourBlock(5)}
							{this.getColourBlock(6)}
						</ColourBlockContainer>
						{this.getColourBlock(7)}
						<ColourBlockContainer key={key++} horizontal>
							{this.getColourBlock(8)}
							{this.getColourBlock(9)}
						</ColourBlockContainer>
					</ColourBlockContainer>
				</div>
	}

	render() {
		return (
			<div>
				{ this.props.desktopView ? this.generateDesktopView() : this.generateMobileView() }
			</div>
		);
	}
}
