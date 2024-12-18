import { SkeletonBlock, SkeletonList, TaskRow } from "./style";

type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: string;
};

export default function Skeleton({ width, height, radius }: SkeletonProps) {
  return <SkeletonBlock $width={width} $height={height} $radius={radius} />;
}

type TaskListSkeletonProps = {
  count?: number;
};

export function TaskListSkeleton({ count = 4 }: TaskListSkeletonProps) {
  return (
    <SkeletonList aria-busy="true" aria-label="Cargando tareas">
      {Array.from({ length: count }).map((_, i) => (
        <TaskRow key={i}>
          <SkeletonBlock $width="18px" $height="18px" $radius="4px" />
          <SkeletonBlock $width={`${60 + ((i * 13) % 30)}%`} $height="14px" />
          <SkeletonBlock $width="36px" $height="20px" $radius="6px" />
        </TaskRow>
      ))}
    </SkeletonList>
  );
}
