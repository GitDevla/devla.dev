"use client";

// eslint-disable-next-line no-restricted-imports
import { LinkProps } from "next/link";
import TransitionLink from "./TransitionLink";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
    external?: boolean;
    style?: React.CSSProperties;
}

export default function Link({
    children,
    href,
    className,
    style,
    external = false,
    ...props
}: TransitionLinkProps) {
    if (external) {
        return (
            <a
                style={style}
                className={className}
                href={href}
                target={"_blank"}
                {...props}
            >
                {children}
            </a>
        );
    }
    return (
        <TransitionLink
            style={style}
            className={className}
            href={href}
            {...props}
        >
            {children}
        </TransitionLink>
    );
}
