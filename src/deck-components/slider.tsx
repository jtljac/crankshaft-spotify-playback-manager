import {Component, ComponentChild, createRef} from "preact";
import React from "preact/compat";
import {DeckAudioFx, playAudioEffect} from "../deck-utils/soundfx";

/**
 * Normalise the value to a number between 0 and 1
 * @param value The value to normalise
 * @param minValue The minimum the value can be
 * @param maxValue the maximum the value can be
 * @return The normalised value
 */
function valueToPercent(value: number, minValue: number, maxValue: number): number {
    return (value - minValue) / (maxValue - minValue);
}

/**
 * Round the value to the closest step
 * @param value The value to round
 * @param increment The distance between each step in the range
 * @return The rounded value
 */
function roundToIncrement(value: number, increment: number) : number {
    return Math.round(value / increment) * increment;
}

export interface SliderProperties {
    /**
     * The label for the slider
     */
    label: string;
    /**
     * The maximum value the slider can be set to
     * @default 100
     */
    maxValue?: number;
    /**
     * The minimum value the slider can be set to
     * @default 0
     */
    minValue?: number;
    /**
     * The discrete size of each step on the slider
     * @default 1
     */
    increment?: number;
    /**
     * The initial value of the slider
     */
    initialValue?: number;
    /**
     * A callback for when the slider is dragged (fires while the user is dragging)
     * @param value The value of the slider
     * @param percentage the value normalised between 0 and 1
     */
    onInput?: (value: number, percentage: number) => Promise<void>;
    /**
     * A callback for when the slider has been set (fires while the user finishes dragging)
     * @param value The value of the slider
     * @param percentage the value normalised between 0 and 1
     */
    onChange?: (value: number, percentage: number) => Promise<void>;
}

export interface SliderState {
    /**
     * The current value of the slider
     */
    value: number;
}

/**
 * A slider that allows the user to select a value along a range
 * Like the Refresh Rate slider on the performance tab
 */
export class Slider extends Component<SliderProperties, SliderState> {
    trackRef = createRef();

    constructor(props: SliderProperties) {
        super(props);
        const propValue = this.props.initialValue ?? this.minValue;
        this.state = {
            value: propValue
        }
    }

    get maxValue(): number {
        return this.props.maxValue ?? 100;
    }

    get minValue(): number {
        return this.props.minValue ?? 0;
    }

    get increment(): number {
        return this.props.increment ?? 1;
    }

    get sliderValue(): number {
        return valueToPercent(this.state.value, this.minValue, this.maxValue);
    }

    async onTouch(e: TouchEvent): Promise<void> {
        const touch = e.touches.item(0);
        if (!touch) return;

        await this.onMove(touch.clientX);
    }

    async onMouse(e: MouseEvent): Promise<void> {
        await this.onMove(e.clientX);
    }

    async onFinishChange(): Promise<void> {
        await this.props.onInput?.(this.state.value, this.sliderValue);
    }

    async onMove(xPos: number): Promise<void> {
        const trackBounds = this.trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(((xPos - trackBounds.x) / trackBounds.width), 1));
        const range = this.maxValue - this.minValue;

        const normalisedRange = roundToIncrement(percent * range, this.increment);
        const newValue = this.minValue + normalisedRange;
        const newPercent = valueToPercent(newValue, this.minValue, this.maxValue);

        if (newValue !== this.state.value) {
            if (newValue > this.state.value) {
                // noinspection ES6MissingAwait
                playAudioEffect(DeckAudioFx.sliderUp);
            } else {
                // noinspection ES6MissingAwait
                playAudioEffect(DeckAudioFx.sliderDown);
            }
            await this.setState({
                value: newValue
            });

            await this.props.onInput?.(newValue, newPercent);
        }
    }

    render(): ComponentChild {
        return (
            <div
                className="gamepaddialog_Field_S-_La gamepaddialog_WithFirstRow_qFXi6 gamepaddialog_WithChildrenBelow_1u5FT gamepaddialog_VerticalAlignCenter_3XNvA gamepaddialog_InlineWrapShiftsChildrenBelow_pHUb6 gamepaddialog_WithBottomSeparatorStandard_3s1Rk gamepaddialog_ChildrenWidthFixed_1ugIU gamepaddialog_ExtraPaddingOnChildrenBelow_5UO-_ gamepaddialog_StandardPadding_XRBFu gamepaddialog_HighlightOnFocus_wE4V6 Panel Focusable"
                style="--indent-level:0;">
                <div className="gamepaddialog_FieldLabelRow_H9WOq">
                    <div className="gamepaddialog_FieldLabel_3b0U-">
                        <div className="gamepadslider_LabelText_1-PvK">{this.props.label}</div>
                        <div className="gamepadslider_DescriptionValue_2oRwF">{this.state.value}</div>
                    </div>
                </div>
                <div className="gamepaddialog_FieldChildren_14_HB">
                    <div className="gamepadslider_SliderControlWithIcon_2M8Pt Panel Focusable">
                        <div className="gamepadslider_SliderControlPanelGroup_MY8iY Panel Focusable" tabIndex={0}>
                            <div className="gamepadslider_SliderControlAndNotches_1Cccx Focusable" tabIndex={0}
                                 style={"--normalized-slider-value:" + this.sliderValue + ";"}>
                                <div className="gamepadslider_SliderControl_3o137"
                                     onTouchStart={(e) => this.onTouch(e)}
                                     onTouchMove={(e) => this.onTouch(e)}
                                     onTouchEnd={() => this.onFinishChange()}
                                     onMouseDown={(e) => this.onMouse(e)}
                                     onMouseMove={(e) => this.onMouse(e)}
                                     onMouseUp={() => this.onFinishChange()}
                                >
                                    <div className="gamepadslider_SliderTrack_Mq25N" ref={this.trackRef}></div>
                                    <div className="gamepadslider_SliderHandleContainer_1pQZi">
                                        <div className="gamepadslider_SliderHandle_2yVKj"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export interface IconSliderProperties {
    /**
     * An SVG for the icon at the front of the slider
     * must be 36x36
     */
    leadingIcon: ComponentChild;
    /**
     * The initial value of the slider
     * between 0 and 1
     * @default 0
     */
    initialValue?: number;
    /**
     * A callback for when the slider is dragged (fires while the user is dragging)
     * @param value The value of the slider
     */
    onInput?: (value: number) => Promise<void>;
    /**
     * A callback for when the slider has been set (fires while the user finishes dragging)
     * @param value The value of the slider
     */
    onChange?: (value: number) => Promise<void>;
}
export interface IconSliderState {
    value: number;
    oldValue: number;
}

/**
 * A smaller slider, that has an icon at the front and no label or value text
 * Like the sliders on the quick settings tab
 */
export class IconSlider extends Component<IconSliderProperties, IconSliderState> {
    trackRef = createRef();

    constructor(props: IconSliderProperties) {
        super(props);
        this.state = {
            value: this.props.initialValue ?? 0,
            oldValue: this.props.initialValue ?? 0
        }
    }

    async onTouch(e: TouchEvent): Promise<void> {
        const touch = e.touches.item(0);
        if (!touch) return;

        await this.onMove(touch.clientX);
    }

    async onMouse(e: MouseEvent): Promise<void> {
        await this.onMove(e.clientX);
    }

    async onFinishChange(): Promise<void> {
        if (this.state.value >= this.state.oldValue) {
            // noinspection ES6MissingAwait
            playAudioEffect(DeckAudioFx.sliderUp);
        } else {
            // noinspection ES6MissingAwait
            playAudioEffect(DeckAudioFx.sliderDown);
        }
        await this.props.onInput?.(this.state.value);
    }

    async onMove(xPos: number): Promise<void> {
        const trackBounds = this.trackRef.current.getBoundingClientRect();
        let percent = Math.max(0, Math.min(((xPos - trackBounds.x) / trackBounds.width), 1));

        percent = roundToIncrement(percent, 0.05);

        if (percent !== this.state.value) {

            await this.setState({
                value: percent,
                oldValue: this.state.value
            });

            await this.props.onInput?.(percent);
        }
    }

    render(): ComponentChild {
        return (
            <div
                className="gamepaddialog_Field_S-_La gamepaddialog_WithChildrenBelow_1u5FT gamepaddialog_VerticalAlignCenter_3XNvA gamepaddialog_InlineWrapShiftsChildrenBelow_pHUb6 gamepaddialog_WithBottomSeparatorStandard_3s1Rk gamepaddialog_ChildrenWidthFixed_1ugIU gamepaddialog_ExtraPaddingOnChildrenBelow_5UO-_ gamepaddialog_CompactPadding_1DIZQ gamepaddialog_HighlightOnFocus_wE4V6 Panel Focusable"
                style="--indent-level:0;">
                <div className="gamepaddialog_FieldChildren_14_HB">
                    <div className="gamepadslider_SliderControlWithIcon_2M8Pt Panel Focusable">
                        <div className="gamepadslider_Icon_21uKi Panel Focusable">
                            {this.props.leadingIcon}
                        </div>
                        <div className="gamepadslider_SliderControlPanelGroup_MY8iY Panel Focusable" tabIndex={0}>
                            <div className="gamepadslider_SliderControlAndNotches_1Cccx Focusable" tabIndex={0}
                                 style={"--normalized-slider-value:" + this.state.value + ";"}>
                                <div className="gamepadslider_SliderControl_3o137"
                                    ref={this.trackRef}
                                    onTouchStart={(e) => this.onTouch(e)}
                                    onTouchMove={(e) => this.onTouch(e)}
                                    onTouchEnd={() => this.onFinishChange()}
                                    onMouseDown={(e) => this.onMouse(e)}
                                    onMouseMove={(e) => this.onMouse(e)}
                                    onMouseUp={() => this.onFinishChange()}
                                >
                                    <div className="gamepadslider_SliderTrack_Mq25N "></div>
                                    <div className="gamepadslider_SliderHandleContainer_1pQZi">
                                        <div className="gamepadslider_SliderHandle_2yVKj"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export interface DiscreteSliderProperties {
    /**
     * The label for the slider
     */
    label: string;
    /**
     * A list of values that the slider can select
     */
    values: string[];
    /**
     * The index of the element that the slider should select initially
     */
    startingIndex?: number;
    /**
     * A callback for when the slider is dragged (fires while the user is dragging)
     * @param value The selected item from the values array
     * @param index the index of the values array
     */
    onInput?: (value: string, index: number) => Promise<void>;
    /**
     * A callback for when the slider has been set (fires while the user finishes dragging)
     * @param value The selected item from the values array
     * @param index the index of the values array
     */
    onChange?: (value: string, index: number) => Promise<void>;
}

export interface DiscreteSliderState {
    index: number;
}

/**
 * A descrete slider that selects items from a list of options
 * Like the Performance Overlay Level slider on the Performance Tab
 */
export class DiscreteSlider extends Component<DiscreteSliderProperties, DiscreteSliderState> {
    trackRef = createRef();

    constructor(props: DiscreteSliderProperties) {
        super(props);
        this.state = {
            index: this.props.startingIndex ?? 0
        }
    }

    get sliderValue() {
        return this.state.index / (this.props.values.length - 1);
    }

    async onTouch(e: TouchEvent): Promise<void> {
        const touch = e.touches.item(0);
        if (!touch) return;

        await this.onMove(touch.clientX);
    }

    async onMouse(e: MouseEvent): Promise<void> {
        await this.onMove(e.clientX);
    }

    async onFinishChange(): Promise<void> {
        await this.props.onInput?.(this.props.values[this.state.index], this.state.index);
    }

    async onMove(xPos: number): Promise<void> {
        const trackBounds = this.trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(((xPos - trackBounds.x) / trackBounds.width), 1));
        const range = this.props.values.length - 1;

        const newIndex = Math.round(percent * range);

        if (newIndex !== this.state.index) {
            if (newIndex > this.state.index) {
                // noinspection ES6MissingAwait
                playAudioEffect(DeckAudioFx.sliderUp);
            } else {
                // noinspection ES6MissingAwait
                playAudioEffect(DeckAudioFx.sliderDown);
            }
            await this.setState({
                index: newIndex
            });

            await this.props.onInput?.(this.props.values[newIndex], newIndex);
        }
    }

    render(): ComponentChild {
        return (
            <div
                className="gamepaddialog_Field_S-_La gamepaddialog_WithFirstRow_qFXi6 gamepaddialog_WithChildrenBelow_1u5FT gamepaddialog_VerticalAlignCenter_3XNvA gamepaddialog_InlineWrapShiftsChildrenBelow_pHUb6 gamepaddialog_WithBottomSeparatorStandard_3s1Rk gamepaddialog_ChildrenWidthFixed_1ugIU gamepaddialog_ExtraPaddingOnChildrenBelow_5UO-_ gamepaddialog_StandardPadding_XRBFu gamepaddialog_HighlightOnFocus_wE4V6 Panel Focusable gpfocuswithin"
                style="--indent-level:0;">
                <div className="gamepaddialog_FieldLabelRow_H9WOq">
                    <div className="gamepaddialog_FieldLabel_3b0U-">{this.props.label}</div>
                </div>
                <div className="gamepaddialog_FieldChildren_14_HB">
                    <div className="gamepadslider_SliderControlWithIcon_2M8Pt Panel Focusable gpfocuswithin">
                        <div className="gamepadslider_SliderControlPanelGroup_MY8iY Panel Focusable gpfocuswithin"
                             tabIndex={0}>
                            <div className="gamepadslider_SliderControlAndNotches_1Cccx Focusable gpfocus gpfocuswithin"
                                 tabIndex={0} style={"--normalized-slider-value:" + this.sliderValue + ";"}>
                                <div className="gamepadslider_SliderControl_3o137"
                                    ref={this.trackRef}
                                    onTouchStart={(e) => this.onTouch(e)}
                                    onTouchMove={(e) => this.onTouch(e)}
                                    onTouchEnd={() => this.onFinishChange()}
                                    onMouseDown={(e) => this.onMouse(e)}
                                    onMouseMove={(e) => this.onMouse(e)}
                                    onMouseUp={() => this.onFinishChange()}
                                >
                                    <div
                                        className="gamepadslider_SliderTrack_Mq25N gamepadslider_SliderHasNotches_2XiAy "></div>
                                    <div className="gamepadslider_SliderHandleContainer_1pQZi">
                                        <div className="gamepadslider_SliderHandle_2yVKj"></div>
                                    </div>
                                </div>
                                <div className="gamepadslider_SliderNotchContainer_2N-a5 Panel Focusable">
                                    {
                                        this.props.values.map((value, index) => {
                                            return (
                                                <div className="gamepadslider_SliderNotch_3x6ve">
                                                    <div
                                                        className={"gamepadslider_SliderNotchTick_Fv1Ht" + (this.state.index >= index ? " gamepadslider_TickActive_1gnUV" : "")}></div>
                                                    <div className="gamepadslider_SliderNotchLabel_u_sH1">{value}</div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}