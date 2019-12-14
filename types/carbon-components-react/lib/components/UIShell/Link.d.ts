import * as React from "react";
import { Overwrite, ReactAnchorAttr, SideNavSharedProps } from '../../../typings/shared';

type InnerElementProps<P> = Omit<P, "element">;
export interface LinkPropsBase<P = ReactAnchorAttr> extends SideNavSharedProps {
    element?: string | React.JSXElementConstructor<InnerElementProps<P>>; // required but has default value
}

export type LinkProps<P extends object = ReactAnchorAttr, IP = P> = Overwrite<P, LinkPropsBase<IP>>;

declare function Link<P extends object = ReactAnchorAttr>(
    props: React.PropsWithChildren<LinkProps<P>>,
    ref: React.Ref<HTMLElement>
): React.ReactElement;

export default Link;
