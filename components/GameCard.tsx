import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { useGames, type Game } from "~/lib/game/game";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

function DeleteDialog({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { deleteById } = useGames();

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Game ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this game ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row">
          <DialogClose
            asChild
            className="flex-1"
            onPress={() => {
              setOpen(false);
            }}
          >
            <Button>
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <DialogClose
            asChild
            className="flex-1"
            onPress={() => {
              deleteById({ id });
              setOpen(false);
            }}
          >
            <Button className="bg-destructive">
              <Text>Delete</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function GameCard({ game }: { game: Game }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDialogOpen(true);
  };

  return (
    <Card className="mt-4 mx-16" key={game.id}>
      <TouchableOpacity
        onLongPress={() => {
          openDeleteDialog();
        }}
      >
        <CardHeader>
          <CardTitle>{game.name}</CardTitle>
          <CardDescription>{`${game.players.length} players\ncreated: ${game.creationDate.toDateString()}\nlast played: ${game.lastPlayedDate.toDateString()}`}</CardDescription>
          <CardContent>
            {game.players.map((player) => (
              <Text
                key={player.name}
              >{`${player.name}: ${player.score} points`}</Text>
            ))}
            <Button
              className="mt-2"
              variant={"secondary"}
              onPress={() => {
                router.push(`/game/${game.id}`);
              }}
            >
              <Text>Continue Game</Text>
            </Button>
          </CardContent>
        </CardHeader>
        <DeleteDialog id={game.id} open={dialogOpen} setOpen={setDialogOpen} />
      </TouchableOpacity>
    </Card>
  );
}
