import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
  print(f"Logged in as {bot.user}")

@bot.command()
async def saluton(ctx):
  await ctx.send("Saluton!")

token=open("./token.txt", mode="r").read()
print("TOKEN :",token)
bot.run(token)