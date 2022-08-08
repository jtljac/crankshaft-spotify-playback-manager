import {Component, ComponentChild, ComponentChildren} from "preact";
import React from "preact/compat";

export interface SectionProperties {
    /**
     * The title of the section
     */
    title?: string;
    /**
     * The children of the section element
     */
    children?: ComponentChildren;
}

/**
 * A simple section used to organise elements on the sidebar
 * Wraps its children with a row element
 */
export class Section extends Component<SectionProperties> {
    render(): ComponentChild {
        return (
            <div class="quickaccesscontrols_PanelSection_2C0g0" style="padding: 0">
                {this.props.title && <div className="quickaccesscontrols_PanelSectionTitle_2iFf9">
                    <div className="quickaccesscontrols_Text_1hJkB">{this.props.title}</div>
                </div>}
                {this.props.children ? [this.props.children].flat().map((child: ComponentChild) => {
                    return (<div className="quickaccesscontrols_PanelSectionRow_2VQ88">
                        {child}
                    </div>);
                }) : ""}
            </div>
        );
    }

}

