# CIS 566 Homework 2: Implicit Surfaces

## Saranya Sampath Submission -- saranyas

For this project, my inspiration came from the Pokemon Stadium stage from the video game Super Smash Bros. The reference image can be found here: https://www.ssbwiki.com/images/thumb/7/73/SSBU-Pok%C3%A9mon_Stadium.png/1200px-SSBU-Pok%C3%A9mon_Stadium.png

I created the pokemon Pikachu and Pichu on this stage. I did this through using SDFs and operations such as union and smooth blend. I was able to create the pokeball on the stage by using operations like subtraction.

There are some features that can be changed through interaction with the GUI. For example, one can change the timeOfDay drop down menu to StarrySky or DayCycle. The StarrySky option produces a background uses random probablilty and a sin function to create the animatoin of the starts in the background as they "sparkle". This creates an infinite starry sky that one can see when they pan around the world. For the DayCycle, I referenced code from CIS460 to create a day-night cycle, and modified it so that the user can change the dayCycleSpeed. The speed affects how fast the sun rises and falls and can be changed in the GUI. 

The user can also change the stadium color. The defualt color is the green color that can be found in the reference image. Also, they can choose whether the platforms should animate or not. This causes the two support platforms on either side of the Pokemon to levitate and fall down again. This was accomplished through using toolbox functions such as trig functions as well as the triangle wave function. 

I included links to all the code that I referenced throughout comments in the code. For instance, I used a lot of IQ's formulas for SDFs, and was inspired by some shaders on ShaderToy for other effects such as the StarrySky. 

