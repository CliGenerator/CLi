
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoriteTemplates from "../components/FavoriteTemplates";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { Feature, Framework } from "../utils/generateCommand";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Settings, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollToTop from "../components/ScrollToTop";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { section = "favorites" } = useParams();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [isLoading, user, navigate]);

  const handleSelectTemplate = (framework: Framework, features: Feature[]) => {
    navigate(`/?framework=${framework}&features=${features.join(",")}`);
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-5xl page-fade-in pt-24">
        <div className="flex flex-col items-center text-center mb-12">
          <Avatar className="h-20 w-20 border-2 border-primary/20 glow mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-2 animated-gradient-text">
            {user.name}
          </h2>
          <p className="text-muted-foreground">
            {user.email} • Joined via {user.provider}
          </p>
        </div>

        <Tabs defaultValue={section} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger 
                value="favorites" 
                className="flex items-center gap-2"
                onClick={() => navigate("/profile/favorites")}
              >
                <Star className="w-4 h-4" />
                <span>Favorites</span>
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="flex items-center gap-2"
                onClick={() => navigate("/profile/activity")}
              >
                <Calendar className="w-4 h-4" />
                <span>Activity</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2"
                onClick={() => navigate("/profile/settings")}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="favorites" className="mt-0">
            <div className="glass rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Saved Templates</h3>
              <FavoriteTemplates onSelectTemplate={handleSelectTemplate} />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <div className="glass rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p>No recent activity to display</p>
                <p className="text-sm">Your activity will appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="glass rounded-xl p-6 border border-white/10">
              <UpdateProfileForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Profile;
