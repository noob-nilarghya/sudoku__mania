#include <bits/stdc++.h>
using namespace std;

int board[9][9];

int randomNumGen(){
    // This function will genereate random number from 1 to 9 incusive
    int range = (9 - 1) + 1;
    int num = rand() % range + 1;
    return num;
}

bool isPermitted(int num, int row, int col){
    // checking the same row
    for(int j=0; j<9; j++){
        if(j!=col && board[row][j]==num){
            return false;
        }
    }

    // checking the same col
    for(int i=0; i<9; i++){
        if(i!=row && board[i][col]==num){
            return false;
        }
    }

    // checking BOXES row[0-2], All col
    if(row>=0 && row<=2 && col>=0 && col<=2){
        for(int i=0; i<=2; i++){
            for(int j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=3 && col<=5){
        for(int i=0; i<=2; i++){
            for(int j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=6 && col<=8){
        for(int i=0; i<=2; i++){
            for(int j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[3-5], All col
    if(row>=3 && row<=5 && col>=0 && col<=2){
        for(int i=3; i<=5; i++){
            for(int j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=3 && col<=5){
        for(int i=3; i<=5; i++){
            for(int j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=6 && col<=8){
        for(int i=3; i<=5; i++){
            for(int j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[6-8], All col
    if(row>=6 && row<=8 && col>=0 && col<=2){
        for(int i=6; i<=8; i++){
            for(int j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=3 && col<=5){
        for(int i=6; i<=8; i++){
            for(int j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=6 && col<=8){
        for(int i=6; i<=8; i++){
            for(int j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]==num){
                    return false;
                }
            }
        }
    }

    return true;
}


void resetBoard(){
    for(int i=0; i<9; i++){
        for(int j=0; j<9; j++){
            board[i][j]=0;
        }
    }
}

void printBoard(){
    cout<<" -------------------------------------"<<endl;
    for(int i=0; i<9; i++){
        for(int j=0; j<9; j++){
            cout<<" | "<<board[i][j];
        }
        cout<<" |"<<endl;
        cout<<" -------------------------------------"<<endl;
    }
}

bool createFullSudoku(){

    // we first fill all the grid using backtracking. After that we will randomly remove 'missingBox' number of grid
    // We generate random number from 1 to 9 & try to fill (i,j)th grid with that random number.
    // If we fail to do so, we will backtrack & try with next random number. If succeeded, then move to next grid

    for(int i=0; i<9; i++){
        for(int j=0; j<9; j++){
            //cout<<i<<" "<<j<<endl;

            if(board[i][j]==0){ // empty grid
                int count=0;
                unordered_map<int, int> m; // to ensure that we check with 9 different random numbers (i.e from [1,9])

                while(count<9){ // Try with diff rand num in [1,9] until purpose solves
                    int num= randomNumGen();
                    
                    if(m.count(num)==0){
                        m[num]++;
                        count++;

                        if(isPermitted(num, i, j)==true){ 
                            board[i][j]=num;
        
                            if(createFullSudoku()==true){
                                return true;
                            }
                            else{  // reached this line means 'num' is not a successful choice to fill current grid. So, make this grid empty & try with other num
                                board[i][j]=0;  
                            }
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

void removeGrid(int numOfGridRemove){
    int count=0;
    unordered_map< string, int> m;

    while(count < numOfGridRemove){
        int row= randomNumGen()-1; int col= randomNumGen()-1;
        string s=""; s.push_back(row+'0'); s.push_back(col+'0');
        if(m.count(s) == 0){
            board[row][col]=0;
            m[s]++;
            count++;
        }
    }
}

void sudokuGenerator(int numOfGridToRemove){

    resetBoard();
    bool ans= createFullSudoku();
    removeGrid(numOfGridToRemove);
}

bool checkUserSolution(){
    for(int i=0; i<9; i++){
        for(int j=0; j<9; j++){
            int num=board[i][j];
            if(isPermitted(num, i, j)==false){
                cout<<"You made a mistake at ("<<i+1<<","<<j+1<<")th grid !"<<endl;
                return false;
            }
        }
    }
    return true;
}

bool SolveSudoku(){
    for(int i=0; i<9; i++){
        for(int j=0; j<9; j++){

            if(board[i][j]==0){  //empty board
                // Try to fill the board with one of the number in [1,9]

                for(int num=1; num<=9; num++){

                    if(isPermitted(num, i, j)==true){
                        board[i][j]=num;
                        // call solveSudoku to solve next unfilled grid
                        if(SolveSudoku()==true){ // solveSudoku is able to slve furthur unfilled grid successfully
                            return true;
                        }
                        else{
                            board[i][j]= 0; // backtrack, Try with some other num
                        }
                    }
                }
                // If none of the num in [1,9] is able to solve sudoku, it means sudoku is unsolvable
                return false;
            }
        }
    }
    
    // Reached here, that means, it has filled all the unfilled grid, & sudoku is complete
    return true;
}


int main(){
   
    sudokuGenerator(30);
    cout<<"Unsolved Sudoku: ---->"<<endl;
    printBoard();


    bool solver= SolveSudoku();
    cout<<endl<<endl<<"Solved Sudoku : ---->"<<endl;
    printBoard();


    if(checkUserSolution()==true){ cout<<"Congratulations! Your Solution is CORRECT :)"<<endl; }
    else{ cout<<"OOPS ! Your solution is WRONG :("<<endl; }
  
    return 0;
}


