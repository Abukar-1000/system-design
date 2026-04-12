// Move this interface def out 
type Case = 'case';
type Optimization = 'optimization';
type OptionSpace = Case | Optimization;

export interface ICase 
{
    when: string | undefined,
    solution: string[] | undefined,
    type: OptionSpace | Case
};

export interface IOptimization extends ICase 
{
    type: OptionSpace | Optimization
};

type Implementation = ICase;

export interface IReason 
{
    application: string | undefined,
    implementation: Implementation[] | undefined,
    tradeOffs: string | undefined
};

export const reason: IReason = 
{
    application: `
    Allows a team to consistently hash fields in the event
    that the hash space changes. A hash space can change when
    the number of hash destinations increase. For example a 
    server going offline due to high traffic spike. Or more
    servers being added to better handle traffic. Or decomissioning
    a server because its getting old.
    `,
    tradeOffs: `
        []
    `,
    implementation: [
        {
            solution: [
                `Create a hash ring that has a fixed number of points.
                The hash ring will span from 0 to the max output of 
                your hash function, typically ( 2 ^ 32 ) - 1.
                `
            ],
            type: "case"
        } as ICase,
        
        {
            when: `When hashing we do the following:`,
            solution: [
                `We first hash field.`,
                `We then find the location of the hash output on our hash ring.`,
                `Then we move clockwise untill we hit a location with a node on it.`,
                ``,
            ],
            type: "case"
        } as ICase,
        
        {
            when: `When inserting a new node, we do the following:`,
            solution: [
                `We move COUNTERCLOCKWISE untill we hit a node N.`,
                `All elements from the counterclockwise node we hit N_(i - 1) up to the node just interted
                must be rehashed to the new node N. These where nodes that where going to node N_(i + 1). But now 
                we inserted N in between N_(i - 1) and N_(i + 1).`,
                `Then we move clockwise untill we hit a location with a node on it.`,
                ``,
            ],
            type: "case"
        } as ICase,
        
        {
            when: `When deleting a node, we do the following:`,
            solution: [
                `We move COUNTERCLOCKWISE untill we hit a node N.`,
                `All elements from the counterclockwise node we hit N_(i - 1) up to the node just deleted
                must be rehashed to the next node N_(i + 1). These where nodes that where going to node N. But now 
                we deleted N and need to map all elements associated with it to the next node N_(i + 1), going clockwise.`,
                ``,
            ],
            type: "case"
        } as ICase,

        {
            when: `
            When deleting a node we have a problem. Assuming all elements assigned where evenly distributed
            before, then the N_( i + 1 ) will have more elements than the surrounding nodes. To balance the 
            distribution of hashed elements, we must do the following:
            `,
            solution: [
                'Between and two nodes on the hash ring, we create virtual nodes.',
                `These virtual nodes are essentially pointers to the original node 
                they represent.`,
                `This essentially means instead of putting a node on one spot in the hash ring,
                it can occupy many spots at the same time.`,
                `Therefore, we end up evenly redistributing the nodes again.`,
                `Later when another deletion happens, no 2 nodes next to each other are have
                too much space in between them, so less needs to be rehashed to a given node.`,
                `The downside is now we must go through the entire hash space ensuring we cover
                points that used to hold old virtual nodes.`,
            ],
            type: "optimization"
            
        } as IOptimization
    ]
};


/**
 * Implementation:

- Consistent Hashing Requirements:
    - [Deletion]: 
        - Mark all nodes that affected.
        - Mark the new node that has to handle the new load.
    - [Insertion]:
        - Mark all nodes that have to be rehashed.
        - New node is known.
    - [Optional Features]:
        - Enable virtual nodes.
        - Change hash space.
        - Path finding algorithm for placing nodes on hash ring.

 */