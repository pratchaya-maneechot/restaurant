import { Tree, TreeNode } from 'react-organizational-chart';

import { useTheme } from '@mui/material/styles';

import { flattenArray } from '@src/utils/flatten-array';

import GroupNode from './common/group-node';
import SimpleNode from './common/simple-node';
import StandardNode from './common/standard-node';
import { ListProps, OrganizationalChartProps, SubListProps } from './types';

// ----------------------------------------------------------------------

export default function OrganizationalChart({ data, variant = 'simple', sx, ...other }: OrganizationalChartProps) {
  const theme = useTheme();

  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.palette.divider}
      label={
        (variant === 'simple' && <SimpleNode sx={sx} node={data} />) ||
        (variant === 'standard' && (
          <StandardNode
            sx={sx}
            node={data}
            onEdit={() => console.info('EDIT', data.name)}
            onDelete={() => console.info('DELETE', data.name)}
          />
        )) ||
        (variant === 'group' && <GroupNode sx={sx} node={data} />)
      }
      {...other}
    >
      {data.children.map((list) => (
        <List key={list.name} depth={1} data={list} variant={variant} sx={sx} />
      ))}
    </Tree>
  );
}

// ----------------------------------------------------------------------

export function List({ data, depth, variant, sx }: ListProps) {
  const hasChild = data.children && !!data.children;

  return (
    <TreeNode
      label={
        (variant === 'simple' && <SimpleNode sx={sx} node={data} />) ||
        (variant === 'standard' && (
          <StandardNode
            sx={sx}
            node={data}
            onEdit={() => console.info('EDIT', data.name)}
            onDelete={() => console.info('DELETE', data.name)}
          />
        )) ||
        (variant === 'group' && (
          <GroupNode sx={sx} node={data} depth={depth} length={flattenArray(data.children)?.length} />
        ))
      }
    >
      {hasChild && <SubList data={data.children} depth={depth} variant={variant} sx={sx} />}
    </TreeNode>
  );
}

// ----------------------------------------------------------------------

function SubList({ data, depth, variant, sx }: SubListProps) {
  return (
    <>
      {data.map((list) => (
        <List key={list.name} data={list} depth={depth + 1} variant={variant} sx={sx} />
      ))}
    </>
  );
}
