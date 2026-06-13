
const body = document.querySelector('body');
let OnAnimation = false;


function Soldier(soldierColor,name,type,initPostion,parentContainer)
{
    //variables
    this.spriteImage   = new Image();
    this.spriteImage.src   = (soldierColor === "blue") ? "./assets/animation_blueger.png" : "./assets/animation_greenger.png";
    this.name    = name;
    this.health  = 100;
    this.bullets = 100;
    this.type    = type;
    this.x       = initPostion.x;
    this.y       = initPostion.y;
    this.MaxHeight = 30;

    this.verticalDisplacement = 2;
    this.horizontalDisplacement = 3;
    this.sprintVerticalDisplacement= 2; 
    this.sprintHorizontalDisplacement = 2;
    this.sense = "left";
    this.direction = "none";
    this.actualAnimationName = "stading";
    
    //canvas Element 
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');


    //styling canvas
    this.canvas.style.position = "relative";
    this.canvas.style.top      = initPostion.y +"px";
    this.canvas.style.left     = initPostion.x +"px";
    this.canvas.style.border   = "2px solid black";

    //Adding player to html
    parentContainer.append(this.canvas);

    //methods
    this.Reduce_Health = (reduceValue) => 
    {
        if(this.health > 0 ) 
            { this.health -= reduceValue; }
    }

    this.Reduce_Bullets = (reduceValue) =>
    {
        if(this.bullets > 0)
            { this.bullets -= reduceValue; }
    }

    this.Increase_Health = (increaseValue) => 
    {
        if(this.health > 0 ) 
            { this.health += increaseValue; }
    }

    this.Increase_Bullets = (increaseValue) =>
    {
        if(this.bullets > 0)
            { this.bullets += increaseValue; }
    }

    this.Modify_PositionX = (modifValue) =>
    {
        this.x += modifValue;
        this.canvas.style.left = this.x +"px";
    }

    this.Modify_PositionY = (modifValue) =>
    {
        this.y += modifValue;
        this.canvas.style.top = this.y +"px";
    }

    this.Reset_Health = () => { this.health = 100; }

    this.Reset_Bullets = () => { this.bullets = 100 }

    this.Update_Player_Parameters = () =>
    {
        if(KeysList["ArrowRight"] === true) this.direction = "forward";
        else if(KeysList["ArrowLeft"] === true) this.direction = "backward";
        else this.direction = "none";

        if(KeysList["a"] === true) 
        {
            if(this.sense === "right") this.sense = "left";
            else this.sense = "right";
        }

        if(KeysList["Shift"] === true)
        {
            this.verticalDisplacement   += this.sprintVerticalDisplacement;
            this.horizontalDisplacement += this.sprintHorizontalDisplacement;
            KeysList["Shift"] === "none";
        }
        else if(KeysList["Shift"] === false)
        {
            this.verticalDisplacement   -= this.sprintVerticalDisplacement;
            this.horizontalDisplacement -= this.sprintHorizontalDisplacement;
            KeysList["Shift"] === "none";
        }
    }

    this.Update_AI_Parameter = () => {}
}


function AnimationFrameDetails(
        name,frameX,frameY,endingFrameX,
        spriteOffsetX,spriteOffsetY,
        spriteWidth,spriteHeight,
        offsetFrameY,frameLatency,canvasSize,
        specialOffsetsY
    )
{
    this.name            = name;
    this.frameX          = frameX;
    this.frameY          = frameY;
    this.endingFrameX    = endingFrameX;
    this.spriteOffsetX   = spriteOffsetX;
    this.spriteOffsetY   = spriteOffsetY;
    this.spriteWidth     = spriteWidth;
    this.spriteHeight    = spriteHeight;
    this.offsetFrameY    = offsetFrameY;
    this.frameLatency    = frameLatency;
    this.specialOffsetsY = specialOffsetsY;
    this.actualFrameX    = frameX;
    this.canvasWidth     = canvasSize.width;
    this.canvasHeight    = canvasSize.height;
}


function Animation(name,animationFrameDetails,moveListAvailable,modifiedDirection = null,modifiedSize = null,newYPosition = null)
{
    this.frameSwitchValue = 0;
    this.endAnimation = false;
    this.SizeSet = false;
    this.name = name;
    this.nextAnimantion = null;
    this.Soldier = null;
    this.modifyDirection = null;
    this.modifiedSize = modifiedSize;
    this.isOnAnimation = false;
    this.newYPosition = null;

    this.forwardCanvasMove  = () => { this.Soldier.Modify_PositionX(this.Soldier.verticalDisplacement); }
    this.backwardCanvasMove = () => { this.Soldier.Modify_PositionX(-this.Soldier.verticalDisplacement); }
    this.downwardCanvasMove = () => { this.Soldier.Modify_PositionY(this.Soldier.verticalDisplacement); }
    this.upwardCanvasMove   = () => { this.Soldier.Modify_PositionY(-this.Soldier.verticalDisplacement); }

    this.Reset = () =>
    {
        this.frameSwitchValue = 0;
        this.endAnimation = false;
        this.SizeSet = false;
        this.name = name;
        this.nextAnimantion = null;
        // this.Soldier = null;
        this.modifyDirection = null;
        this.modifiedSize = modifiedSize;
        this.isOnAnimation = false;
        this.newYPosition = null;
    }
    
    this.setSoldierModificationDirection = (soldier,modifyDirection) =>
    {
        this.Soldier = soldier;
        this.modifyDirection = modifyDirection;
    }

    this.animate = (soldier,modifyDirection = null) =>
    {
        // if(this.isOnAnimation) {console.log("puta"); return;}
        // // else console.log("shit");
        // this.isOnAnimation = true;
        if(!OnAnimation) OnAnimation = true;
        if(!this.SizeSet)
        {
            this.Soldier = soldier;
            this.modifyDirection = modifyDirection;
            this.newYPosition = newYPosition;
            if(this.modifiedSize === null)
            {
                this.Soldier.canvas.style.width  = animationFrameDetails.canvasWidth  + "px";
                this.Soldier.canvas.style.height = animationFrameDetails.canvasHeight + "px";
            }
            else
            {
                this.Soldier.canvas.style.width  = this.modifiedSize.canvasWidth  + "px";
                this.Soldier.canvas.style.height = this.modifiedSize.canvasHeight + "px";
            }
            if(this.newYPosition !== null) this.Soldier.Modify_PositionY(this.newYPosition);
            this.SizeSet = true;
        }

        this.Soldier.ctx.clearRect(0,0,animationFrameDetails.canvasWidth+220,animationFrameDetails.canvasHeight+75);
        this.Soldier.ctx.save();

        if(this.Soldier.sense === 'left')
        {
            this.Soldier.ctx.translate(305,0);
            this.Soldier.ctx.scale(-1,1);
        }

        this.Soldier.ctx.drawImage(
            this.Soldier.spriteImage,
            animationFrameDetails.spriteOffsetX + (animationFrameDetails.actualFrameX * animationFrameDetails.spriteWidth) + animationFrameDetails.actualFrameX,
            animationFrameDetails.spriteOffsetY + (animationFrameDetails.frameY * animationFrameDetails.spriteHeight) + animationFrameDetails.frameY,
            animationFrameDetails.spriteWidth,animationFrameDetails.spriteHeight,
            0,0,animationFrameDetails.canvasWidth+220,animationFrameDetails.canvasHeight+75
        );


        if(this.frameSwitchValue % animationFrameDetails.frameLatency === 0)
        {
            if(animationFrameDetails.actualFrameX <= animationFrameDetails.endingFrameX) 
                animationFrameDetails.actualFrameX++;
            else 
            {
                animationFrameDetails.actualFrameX = animationFrameDetails.frameX;
                this.Reset();
                this.endAnimation = true;
                OnAnimation = false;
                if(this.newYPosition !== null) this.Soldier.Modify_PositionY(-this.newYPosition);
                // this.isOnAnimation = false;
            }
        }

        let tempMoveListAvailable = (this.modifyDirection != null) ? this.modifyDirection : moveListAvailable;

        if( (tempMoveListAvailable.forward === true) && (this.Soldier.direction === 'forward') )
        {
            if(this.Soldier.sense === 'right') this.forwardCanvasMove();
            else this.forwardCanvasMove();
        }
        else if( (tempMoveListAvailable.backward === true) && (this.Soldier.direction === 'backward') )
        {
            if(this.Soldier.sense === 'right') this.backwardCanvasMove();
            else this.backwardCanvasMove();
        }
        else if( (tempMoveListAvailable.upward === true) && (this.Soldier.direction === 'upward') )
            this.upwardCanvasMove();
        else if( (tempMoveListAvailable.downward === true) && (this.Soldier.direction === 'downward') )
            this.downwardCanvasMove();
        
        
        this.Soldier.ctx.restore();
        this.frameSwitchValue++;

        if(this.Soldier.actualAnimationName === this.name)
        {
            if(!this.endAnimation) requestAnimationFrame(() => {this.animate(this.Soldier,this.modifyDirection)});
            else 
                { this.endAnimation = false; }
        }
        else
            animationList.find((animation) => 
                    { return animation.name === this.Soldier.actualAnimationName}
                ).animate(this.Soldier,modifiedDirection);
    }
}


function Controls()
{
    window.addEventListener("keydown", (e) => { KeysList[e.key] = true; });
    window.addEventListener("keyup", (e) => { KeysList[e.key] = false; });
    window.addEventListener("mousedown", (e) => 
    { 
        if(e.button === 0) 
            KeysList["MouseButton"] = true;
        else if(e.button === 1)
            KeysList["MouseButton2"] = true;
    });
    window.addEventListener("mouseup", (e) => 
    { 
        if(e.button === 0) 
            KeysList["MouseButton"] = false;
        else if(e.button === 1)
            KeysList["MouseButton2"] = false;
});
}


let KeysList = {
    "ArrowRight" : false,
    "ArrowLeft"  : false,
    "ArrowDown"  : false,
    "ArrowUp"    : false,
    "Shift"      : "none",
    "w"          : false,
    "s"          : false,
    "d"          : false,
    "q"          : false,
    "MouseButton": false,
    "MouseButton2": false,
}


let animationDetailsList = [
    new AnimationFrameDetails("standing",0,1,3,1,21,35,52,14,5,{width: 80, height: 80},[]),
    new AnimationFrameDetails("walking",0,0,10,1,12,35,50,14,5,{width: 80, height: 80},[]),
    new AnimationFrameDetails("chiba",0,8,1,1,-12,35,50,15,5,{width: 80, height: 80},[]),
    new AnimationFrameDetails("shooting-straight",2,6,5,3.5,9,35,52.4,14,5,{width: 80, height: 80},[]),
    new AnimationFrameDetails("shooting-up",0,5,1,3,11.5,35,50,14.5,7,{width: 80, height: 80},[]),
    new AnimationFrameDetails("shooting-down",4,4,6,2,0,35,50,14,5,{width: 80, height: 80},[]),
    new AnimationFrameDetails("jumping",0,8,3,2,50,35,50,14.5,5,{width: 80, height: 80},
        [
            [3,10],[3,10],[4.5,8]
        ]
    ),
    new AnimationFrameDetails("falling",4,8,10,1,52,35,50,14.5,5,{width: 80, height: 80},
        [
            [],[],[],[4.5,7],[4.5,6],[4.5,6],[4.5,6],
            [4.5,7],[4.5,8.5],[3,10],[3,10],[3,10]
        ])
];


let animationList = [
    new Animation("standing",animationDetailsList[0],{"forward" : false,"backward" : false,"upward": false,"downward": false},null),
    new Animation("walking",animationDetailsList[1],{"forward" : true,"backward" : true,"upward": false,"downward": false}),
    new Animation("chiba",animationDetailsList[2],{"forward" : true,"backward" : true,"upward": false,"downward": false},null,{"canvasWidth" : 80,"canvasHeight" : 70},10),
    new Animation("falling",animationDetailsList[7],{"forward" : false,"backward" : false,"upward": false,"downward": true},{"forward" : false,"backward" : false,"upward": false,"downward": true}),
    new Animation("jumping",animationDetailsList[6],{"forward" : true,"backward" : true,"upward": true,"downward": false}),
    new Animation("shooting-straight",animationDetailsList[3],{"forward" : false,"backward" : false,"upward": false,"downward": false}),
    new Animation("shooting-up",animationDetailsList[4],{"forward" : false,"backward" : false,"upward": false,"downward": false}),
    new Animation("shooting-down",animationDetailsList[5],{"forward" : false,"backward" : false,"upward": false,"downward": false}),
];


let PlayerList = [];




//------------------------------Demo--------------------------------//

//this.Soldier player should always be the first element the AIs this.Soldiers will be the next ones
PlayerList = [
    new this.Soldier("blue","Mother Fucker","Player",{x : 400, y : 100 },body),
    // new this.Soldier("blue","Fucken Cop","AI",{x : 500, y : 100 },body),
    // new this.Soldier("blue","Flick De Merde","AI",{x : 600, y : 100 },body)
];

Controls();

PlayerList[0].actualAnimationName = "walking"; 

function draw() 
{ 
    if(!OnAnimation)
        animationList[1].animate(PlayerList[0]); 
}
function update() 
{ 
    let found = false;
    PlayerList[0].Update_Player_Parameters();
    if(KeysList["ArrowRight"]) 
    {
        OnAnimation = false;
        PlayerList[0].direction = "forward";
        PlayerList[0].actualAnimationName = "walking";
        found = true;
        // console.log("mince");
    }

    if(KeysList["ArrowLeft"]) 
    {
        OnAnimation = false;
        PlayerList[0].direction = "backward";
        PlayerList[0].actualAnimationName = "walking";
        found = true;
    }

    if(KeysList["ArrowUp"]) 
    {
        OnAnimation = false;
        PlayerList[0].direction = "upward";
        PlayerList[0].actualAnimationName = "jumping";
        found = true;
        ///
    }

    if(KeysList["ArrowDown"]) 
    {
        OnAnimation = false;
        PlayerList[0].actualAnimationName = "chiba";
        found = true;
    }

    if(KeysList["MouseButton"])
    {
        OnAnimation = false;
        PlayerList[0].actualAnimationName = "shooting-straight";
        found = true;
    }
    
    if(KeysList["q"] === true)
    {
        if(PlayerList[0].sense === 'left')
            PlayerList[0].sense = 'right';
        else 
            PlayerList[0].sense = 'left';
    }
    
    if(!found) PlayerList[0].actualAnimationName = "standing";

}

function Animate()
{
    draw();
    update();
    requestAnimationFrame(Animate);
}

Animate();