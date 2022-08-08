import {Component, ComponentChild} from "preact";
import React from "preact/compat";

export interface LabelProperties {
    /**
     * The text for the label
     */
    text: string;
    /**
     * The extra text on the end of the label
     */
    value?: string
}

/**
 * A simple label
 */
export class Label extends Component<LabelProperties> {
    render(): ComponentChild {
        return (
            <div className="gamepaddialog_Field_S-_La gamepaddialog_WithFirstRow_qFXi6 gamepaddialog_VerticalAlignCenter_3XNvA gamepaddialog_InlineWrapShiftsChildrenBelow_pHUb6 gamepaddialog_WithBottomSeparatorStandard_3s1Rk gamepaddialog_StandardPadding_XRBFu gamepaddialog_HighlightOnFocus_wE4V6 Panel Focusable"
                style="--indent-level:0;">
                <div className="gamepaddialog_FieldLabelRow_H9WOq">
                    <div className="gamepaddialog_FieldLabel_3b0U-">{this.props.text}</div>
                    {this.props.value &&
                        <div className="gamepaddialog_FieldChildren_14_HB">
                            <div className="gamepaddialog_LabelFieldValue_5Mylh">{this.props.value}</div>
                        </div>
                    }
                </div>
            </div>
        );
    }

}