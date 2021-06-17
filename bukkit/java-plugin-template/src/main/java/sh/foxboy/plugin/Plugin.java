package sh.foxboy.plugin;

import org.bukkit.plugin.java.JavaPlugin;

public class Statz extends JavaPlugin {

  @Override
  public void onEnable() {
    if (!this.getDataFolder().exists()) {
        getLogger().info("Error: No folder was found! Creating...");
        this.getDataFolder().mkdirs();
        this.saveDefaultConfig();
        this.saveConfig();
        getLogger().info("the folder was created successfully!");
    }

    getLogger().info("Hello :)");
  }

  @Override
  public void onDisable() {

  }
}
