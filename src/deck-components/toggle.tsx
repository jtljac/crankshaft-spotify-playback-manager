import {Component, ComponentChild, RenderableProps} from "preact";
import React from "preact/compat";
import {DeckAudioFx, playAudioEffect} from "../deck-utils/soundfx";

export interface ToggleProperties {
    /**
     * The label for the Toggle
     */
    label: string;
    /**
     * An SVG icon shown before the Toggle
     */
    leadingIcon?: ComponentChild;
    /**
     * An extra description for the Toggle
     */
    description?: string;
    /**
     * The initial State of the toggle
     */
    initialState?: boolean;
    /**
     * The callback for when the Toggle is toggled
     * @param e The Click Event
     * @param state The state of the Toggle
     */
    onClick?: (e: Event, state: boolean) => Promise<void>;
}

export interface ToggleState {
    toggleState: boolean;
}

export class Toggle extends Component<ToggleProperties, ToggleState> {
    constructor(props: RenderableProps<ToggleProperties>) {
        super(props);
        this.state = {
            toggleState: Boolean(props.initialState)
        };
    }

    async toggle() {
        await this.setState({
            toggleState: !this.state.toggleState
        });

        // noinspection ES6MissingAwait
        playAudioEffect(this.state.toggleState ? DeckAudioFx.switchOn : DeckAudioFx.switchOff);
    }

    async onClick(e: Event) {
        await this.toggle();
        await this.props.onClick?.(e, Boolean(this.state.toggleState));
    }

    render() {
        return (
            <div class={"gamepaddialog_Field_S-_La"
                + " gamepaddialog_WithFirstRow_qFXi6"
                + " gamepaddialog_VerticalAlignCenter_3XNvA"
                + (this.props.description ? " gamepaddialog_WithDescription_3bMIS" : "")
                + " gamepaddialog_WithBottomSeparatorStandard_3s1Rk"
                + " gamepaddialog_ExtraPaddingOnChildrenBelow_5UO-_"
                + " gamepaddialog_StandardPadding_XRBFu"
                + " gamepaddialog_HighlightOnFocus_wE4V6"
                + " Panel"
                + " Focusable"}>
                <div class="gamepaddialog_FieldLabelRow_H9WOq">
                    <div className="gamepaddialog_FieldLabel_3b0U-">
                        {this.props.leadingIcon &&
                            <div className="gamepaddialog_FieldLeadIcon_OKYIj">
                                {this.props.leadingIcon}
                            </div>
                        }
                        {this.props.label}
                    </div>
                    <div className="gamepaddialog_FieldChildren_14_HB">
                        <div className={
                                "gamepaddialog_Toggle_24G4g"
                                + (this.state.toggleState ? " gamepaddialog_On_3ld7T" : "")
                                + " Focusable"
                            }
                            tabIndex={0}
                            onClick={(e)=> this.onClick(e)}
                        >
                            <div className="gamepaddialog_ToggleRail_2JtC3"></div>
                            <div className="gamepaddialog_ToggleSwitch_3__OD"></div>
                        </div>
                    </div>
                </div>
                {this.props.description &&
                    <div class="gamepaddialog_FieldDescription_2OJfk">{this.props.description}</div>
                }
            </div>
        );
    }
}