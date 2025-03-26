import { Text } from "~/components/ui/text";
import { Minus, Plus } from "~/lib/icons/icons";
import { TouchableOpacity, View } from "react-native";

function NumberInputButton({
  variant,
  action,
}: {
  variant: "plus" | "minus";
  action: any;
}) {
  const Icon = variant === "plus" ? Plus : Minus;

  return (
    <TouchableOpacity
      onPress={action}
      className="p-2 h-14 w-14 flex justify-center items-center bg-primary-foreground border border-input rounded-full"
    >
      <Icon className="text-foreground" strokeWidth={3} />
    </TouchableOpacity>
  );
}

export function NumberInput({
  value,
  onDecrement,
  onIncrement,
}: {
  value: number;
  onDecrement: any;
  onIncrement: any;
}) {
  return (
    <View className="flex flex-row items-center gap-4">
      <NumberInputButton variant="minus" action={onDecrement} />
      <Text className="border border-input px-3 h-12 rounded-md text-center align-middle">
        {value.toString()}
      </Text>
      <NumberInputButton variant="plus" action={onIncrement} />
    </View>
  );
}
