import { Player, Point, PointsState } from "~/lib/game/game";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export default function PointsSelector({
  player,
  points,
  setPoints,
}: {
  player: Player;
  points: PointsState;
  setPoints: React.Dispatch<React.SetStateAction<PointsState>>;
}) {
  const togglePoint = (point: Point) => {
    setPoints((old) => {
      const next: PointsState = JSON.parse(JSON.stringify(old));

      next[point] = old[point] === null ? player.id : null;
      return next;
    });
  };

  const addRemaining = () => {
    setPoints((old) => {
      const next: PointsState = JSON.parse(JSON.stringify(old));

      Object.entries(next)
        .filter(([_, state]) => state === null)
        .forEach(([point, _]) => {
          next[point as Point] = player.id;
        });

      return next;
    });
  };

  const clear = () => {
    setPoints((old) => {
      const next: PointsState = JSON.parse(JSON.stringify(old));

      Object.entries(next)
        .filter(([_, state]) => state === player.id)
        .forEach(([point, _]) => {
          next[point as Point] = null;
        });

      return next;
    });
  };

  return (
    <View>
      <View className="w-full flex flex-row gap-4 flex-wrap">
        {Object.entries(points).map(([point, state]) => (
          <Button
            disabled={state != null && player.id !== state}
            key={point}
            className="border border-input flex-auto"
            variant={state === null ? "outline" : "destructive"}
            onPress={() => {
              togglePoint(point as Point);
            }}
          >
            <Text>{point}</Text>
          </Button>
        ))}
      </View>
      <View className="mt-4 flex flex-row gap-8">
        <Button className="flex-1" variant={"outline"} onPress={clear}>
          <Text>Clear</Text>
        </Button>
        <Button className="flex-1" onPress={addRemaining}>
          <Text>Add remaining</Text>
        </Button>
      </View>
    </View>
  );
}
