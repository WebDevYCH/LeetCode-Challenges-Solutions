/*
        Design a Data Structure that follows the constraints of a LEAST RECENTLY USED (LRU) CACHE.
        Implement the LRUCache class:
                1) LRUCache( int capacity ) Initialize the LRU Cache with positive size capacity.
                2) int get( int key ) Return the value of the key if the key exists, otherwise return -1.
                3) void put( int key, int value ) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
                4) The functions get and put must each run in O(1) average time complexity.

        Example 1:
                Input:  
                        [ "LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get" ]
                        [ [2], [1,1], [2,2], [1], [3,3], [2], [4,4], [1], [3], [4] ]
                Output: 
                        [ null, null, null, 1, null, -1, null, -1, 3, 4 ]

        Explanation:
                LRUCache lRUCache = new LRUCache(2);
                lRUCache.put(1, 1); // cache is {1=1}
                lRUCache.put(2, 2); // cache is {1=1, 2=2}
                lRUCache.get(1);    // return 1
                lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
                lRUCache.get(2);    // returns -1 (not found)
                lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
                lRUCache.get(1);    // return -1 (not found)
                lRUCache.get(3);    // return 3
                lRUCache.get(4);    // return 4
*/

import java.util.HashMap;

class Node
{
        private int key;
        private int value;
        private Node next;
        private Node previous;
        
        public Node( int key, int value )
        {
                this.key = key;
                this.value = value;
        }
        
        public int getKey() 
        {
                return key;
        }
        
        public int getValue() 
        {
                return value;
        }
        
        public void setNextNode( Node next )
        {
                this.next = next;
        }
        
        public void setPreviousNode( Node previous )
        {
                this.previous = previous;
        }
        
        public void setNextAndPreviousNode( Node node )
        {
                this.next.previous = node;
        }
        
        public void setPreviousAndNextNode( Node node )
        {
                this.previous.next = node;
        }
        
        public Node getNextNode()
        {
                return next;
        }
        
        public Node getPreviousNode()
        {
                return previous;
        }
}

class LRUCache 
{
        
        int capacity;
        Node head = null;
        Node tail = null;
        //HashMap is a key-value pair of Keys as "Key Number" & Value as "Node Address"
        HashMap<Integer, Node> map = null;
        
        public LRUCache( int capacity ) 
        {
                // Initialize Capacity
                this.capacity = capacity;
                // Initialize Doubly Linked List
                head = new Node( 0, 0 );
                tail = new Node( 0, 0 );
                head.setNextNode( tail );
                tail.setPreviousNode( head );
                head.setPreviousNode( null );
                tail.setNextNode( null );
                // Initialize HashMap
                map = new HashMap<Integer, Node>();
        }

        public int get( int key ) 
        {
                if( map.containsKey( key ) )
                {
                        Node node = map.get( key );
                        delete( node );
                        insert( node );
                        return node.getValue();
                }
                else
                {
                        return -1;
                }
        }

        public void put( int key, int value ) 
        {
                if( map.containsKey( key ) )
                {
                        // Remove the Node from the Doubly Linked List
                        Node node = map.get( key );
                        delete( node );
                }
                if( map.size() == capacity )
                {
                        // Remove the Node before Tail Node from the Doubly Linked List
                        Node node = map.get( tail.getPreviousNode().getKey() );
                        delete( node );
                }
                Node node = new Node( key, value );
                insert( node );
        }
        
        public void insert( Node node )
        {
                // Add the key in HashMap
                map.put( node.getKey(), node );
                // Add the node at the first position always
                node.setNextNode( head.getNextNode() );
                node.setNextAndPreviousNode( node );
                head.setNextNode( node );
                node.setPreviousNode( head );
        }

        public void delete( Node node )
        {
                // Remove the key from the HashMap
                map.remove( node.getKey() );
                // Remove the node from the Doubly Linked List
                node.setPreviousAndNextNode( node.getNextNode() );
                node.setNextAndPreviousNode( node.getPreviousNode() );
        }

}

/*
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
*/