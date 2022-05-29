import Children from "../common/Children";
import LayoutPanel from "../common/LayoutPanel";
import { classNames } from "../../../../utils/styles";
import {
  ContainerDefinition,
  DashboardActions,
  useDashboard,
} from "../../../../hooks/useDashboard";
import { useState } from "react";
import { ZoomIcon } from "../../../../constants/icons";

interface ContainerProps {
  allowChildPanelExpand?: boolean;
  allowExpand?: boolean;
  className?: string;
  definition: ContainerDefinition;
  expandDefinition: ContainerDefinition;
  withNarrowVertical?: boolean;
  withPadding?: boolean;
  withTitle?: boolean;
}

const Container = ({
  allowChildPanelExpand = true,
  allowExpand = false,
  className,
  definition,
  expandDefinition,
  withNarrowVertical,
  withPadding = false,
  withTitle,
}: ContainerProps) => {
  const [showZoomIcon, setShowZoomIcon] = useState(false);
  const { dispatch } = useDashboard();
  return (
    <LayoutPanel
      allowExpand={allowExpand}
      className={classNames("relative", className)}
      definition={definition}
      events={{
        onMouseEnter: allowExpand
          ? () => {
              setShowZoomIcon(true);
            }
          : undefined,

        onMouseLeave: allowExpand
          ? () => {
              setShowZoomIcon(false);
            }
          : undefined,
      }}
      withNarrowVertical={withNarrowVertical}
      withPadding={withPadding}
      withTitle={withTitle}
    >
      <>
        {showZoomIcon && (
          <div
            className={classNames(
              "absolute cursor-pointer z-50 right-1 top-1 text-black-scale-4"
            )}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: DashboardActions.SELECT_PANEL,
                panel: { ...expandDefinition },
              });
            }}
          >
            <ZoomIcon className="h-5 w-5" />
          </div>
        )}
      </>
      <Children
        allowPanelExpand={allowChildPanelExpand}
        children={definition.children}
      />
    </LayoutPanel>
  );
};

export default Container;
