import {Component, ComponentChild} from "preact";
import React from "preact/compat";

export interface SectionProperties {
    /**
     * The text on the button
     */
    label?: string,
    /**
     * The callback for when the button has been pressed
     * @param e The click event
     */
    onClick?: (e: Event) => Promise<void>
}

/**
 * A simple button that calls a callback when you click it
 */
export class Button extends Component<SectionProperties> {
    async onClick(event: Event): Promise<void> {
        await this.props.onClick?.(event);
    }

    render(): ComponentChild {
        return (
            <div className="gamepaddialog_Field_S-_La gamepaddialog_WithChildrenBelow_1u5FT gamepaddialog_VerticalAlignCenter_3XNvA gamepaddialog_InlineWrapShiftsChildrenBelow_pHUb6 gamepaddialog_ExtraPaddingOnChildrenBelow_5UO-_ gamepaddialog_StandardPadding_XRBFu gamepaddialog_HighlightOnFocus_wE4V6 Panel Focusable gpfocuswithin"
                style="--indent-level:0;">
                <div className="gamepaddialog_FieldChildren_14_HB">
                    <button type="button"
                            className="DialogButton _DialogLayout Secondary gamepaddialog_Button_1kn70 Focusable gpfocus gpfocuswithin"
                            tabIndex={0}
                            onClick={(e) => this.onClick(e)}
                    >
                        {this.props.label || ""}
                    </button>
                </div>
            </div>
        );
    }

}