
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { User, Save, ArrowLeft } from "lucide-react";
import { Player } from "@/types/golf";

interface PlayerProfileProps {
  player?: Player;
  onSave: (player: Player) => void;
  onBack: () => void;
}

const PlayerProfile = ({ player, onSave, onBack }: PlayerProfileProps) => {
  const form = useForm<Player>({
    defaultValues: {
      id: player?.id || '',
      name: player?.name || '',
      handicap: player?.handicap || 0,
      email: player?.email || '',
      avatar: player?.avatar || '',
      totalGamesPlayed: player?.totalGamesPlayed || 0,
      totalWinnings: player?.totalWinnings || 0,
      favoriteGame: player?.favoriteGame || ''
    }
  });

  const onSubmit = (data: Player) => {
    if (!data.id) {
      data.id = Date.now().toString();
    }
    onSave(data);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800">
              {player ? 'Edit Profile' : 'Create Profile'}
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Player Information</CardTitle>
              <CardDescription>
                Manage your golf profile and handicap information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={form.watch('avatar')} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                        {form.watch('name') ? getInitials(form.watch('name')) : 'P'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avatar URL (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/avatar.jpg" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Handicap */}
                  <FormField
                    control={form.control}
                    name="handicap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Handicap Index</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="54" 
                            step="0.1"
                            placeholder="18.5" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Your official handicap index (0-54). Leave as 0 if you don't have one.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Statistics (readonly for now) */}
                  {player && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {player.totalGamesPlayed || 0}
                        </div>
                        <div className="text-sm text-green-600">Games Played</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          ${player.totalWinnings || 0}
                        </div>
                        <div className="text-sm text-green-600">Total Winnings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {player.favoriteGame || 'N/A'}
                        </div>
                        <div className="text-sm text-green-600">Favorite Game</div>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
